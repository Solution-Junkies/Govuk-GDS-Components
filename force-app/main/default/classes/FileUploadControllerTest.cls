@isTest
public class FileUploadControllerTest {
        
    @isTest
    static void deleteFileTest(){
        ContentVersion cv = new ContentVersion(
        	Title = 'Penguins',
        	PathOnClient = 'Penguins.jpg',
        	VersionData = Blob.valueOf('Test content'),
        	IsMajorVersion = true
        );
        insert cv;
        
        cv = [SELECT Id, Title, ContentDocumentId FROM ContentVersion WHERE Id =: cv.Id LIMIT 1];
        
        Test.startTest();
        FileUploadController.deleteFile(cv.ContentDocumentId);
        Test.stopTest();
    }
    
    @isTest
    public static void getAttachedFilesTest() {
        Account testAccount = new Account();
        testAccount.Name='Test Account' ;
        insert testAccount;
        
        ContentVersion cv = new ContentVersion(
        	Title = 'Penguins',
        	PathOnClient = 'Penguins.jpg',
        	VersionData = Blob.valueOf('Test content'),
        	IsMajorVersion = true
        );
        insert cv;

        List<ContentVersion> lstContVersion = [SELECT Title, ContentDocumentId FROM ContentVersion WHERE Id =: cv.Id];
        List<ContentDocumentLink> lstCntDocLink = new List<ContentDocumentLink>();
        for(ContentVersion objCntVer : lstContVersion) {
            ContentDocumentLink objCntDocLink = new ContentDocumentLink();
            objCntDocLink.ContentDocumentId = objCntVer.ContentDocumentId;
            objCntDocLink.LinkedEntityId = testAccount.Id;
            objCntDocLink.ShareType = 'V';
            lstCntDocLink.add(objCntDocLink);
        }
        insert lstCntDocLink;

        FileUploadController.getAttachedFiles(testAccount.Id);
    }

    @isTest
    public static void saveFilesTest() {
        FileUploadController.FileInfo fileInfo = new FileUploadController.FileInfo();
        fileInfo.Title = 'title';
        fileInfo.VersionData = Blob.valueOf('Test');
        List<object> objList = new List<Object>();
        objList.add(fileInfo);
        
        Account testAccount = new Account();
        testAccount.Name='Test Account' ;
        insert testAccount;
        
        Test.startTest();
        FileUploadController.saveFiles(objList,testAccount.Id);
        Test.stopTest();
    }

}