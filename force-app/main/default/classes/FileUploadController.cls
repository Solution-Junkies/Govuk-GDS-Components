public with sharing class FileUploadController {
    
    @AuraEnabled
    public static void deleteFile(String fileId){
        ContentDocument cd = new ContentDocument(Id = fileId);
        delete cd;
    }
    
    @AuraEnabled
    public static List<ContentDocument> getAttachedFiles(String recordId) {
        List<String> contDocIds = new List<String>();
        for(ContentDocumentLink cdl : [SELECT Id, ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId =: recordId]) {
            contDocIds.add(cdl.ContentDocumentId);
        }
        return [SELECT Id, Title FROM ContentDocument WHERE Id IN: contDocIds];
    }
    
    @AuraEnabled
    public static List<ContentDocument> saveFiles(List<Object> filesToInsert, String strRecId) { 
        List<Id> lstCntVerIds = new List<Id>();
        List<ContentVersion> lstVersionsToInsert = new List<ContentVersion>();
        for (Object objFile : filesToInsert) {
            FileInfo fileData = (FileInfo)JSON.deserialize(JSON.serialize(objFile), FileInfo.class);
            ContentVersion objCntVersion = new ContentVersion();
            objCntVersion.PathOnClient = fileData.Title;
            objCntVersion.Title = fileData.Title;
            objCntVersion.VersionData = fileData.VersionData;
            lstVersionsToInsert.add(objCntVersion);
        }
        
        List<String> lstContDocIds = new List<String>(); // this will house list of content document ids created
        if(!lstVersionsToInsert.isEmpty()) {
            List<Database.SaveResult> res = Database.INSERT(lstVersionsToInsert);
            for (Database.SaveResult saveResult : res) {
                if(saveResult.isSuccess()) {
                    lstCntVerIds.add(saveResult.getId());
                }
            }
            lstContDocIds = createLstCntDocLink(lstCntVerIds, strRecId);
        }  

        return [SELECT Id, Title FROM ContentDocument WHERE Id IN: lstContDocIds];
    }
    
    private static List<String> createLstCntDocLink(List<Id> lstCntVerIds, String strRecordId) {
        List<ContentDocumentLink> lstCntDocLink = new List<ContentDocumentLink>();
        List<ContentVersion> lstContVersion = new List<ContentVersion>();
        List<String> contentDocIds = new List<String>();
        if(!lstCntVerIds.isEmpty()) {
            if(ContentVersion.SObjectType.getDescribe().isAccessible()) {
                lstContVersion = [SELECT Title, ContentDocumentId FROM ContentVersion WHERE Id IN :lstCntVerIds];
            }
            for(ContentVersion objCntVer : lstContVersion) {
                ContentDocumentLink objCntDocLink = new ContentDocumentLink();
                objCntDocLink.ContentDocumentId = objCntVer.ContentDocumentId;
                objCntDocLink.LinkedEntityId = strRecordId;
                objCntDocLink.ShareType = 'V';
                lstCntDocLink.add(objCntDocLink);
                contentDocIds.add(objCntDocLink.ContentDocumentId);
            }
        }

        if(!lstCntDocLink.isEmpty()) {
            try {
                List<Database.SaveResult> res2 = Database.INSERT(lstCntDocLink);
            } catch (DmlException dmlEx) {
                throw new AuraHandledException('Could not insert document to database. Check user permissions ' + dmlEx.getMessage());
            }
        }

        return contentDocIds;
    }
    
    public class FileInfo {
        public String Title;
        public Blob VersionData;
    }
    
}