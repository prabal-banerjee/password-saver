# Password Saver
This is a Chrome extension to save encrypted passwords. Do not save unencrypted passwords to any cloud service provider, as they are vulnerable to password leaks.

The extension lets you save domain specific passwords in encrypted form. You need to remember the master password to decrypt it. 

**Warning: Still in beta. Not responsible for data loss. Use at your own risk**

## Installing
Need more testing before releasing as a packed extension. Hence, the only way to use right now is the following:
- Download the repo files to a folder or use the zip download option and extract the files.
- Open `chrome://extensions` on your Google Chrome.
- Enable developer mode (top-right).
- Select `Load Unpacked` and select the correct folder.
You should be good to go

## Details
The master password is used as a key to encrypt the website specific password, which is saved to the storage. We use the SJCL library for crypto operations. 

Don't forget the master password, else you will _not_ be able to retrieve the password. 

The codebase may contain bugs and can be unstable. Don't save important passwords, just yet. 
