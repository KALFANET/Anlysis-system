import os
import zipfile

# 📂 נתיב לתיקיית הפרויקט (שים לב שזה הנתיב שמצאת בטרמינל)
project_dir = "/Users/kalfanetanelmevorach/client-electron/client"

# שם קובץ ה-ZIP שיווצר
zip_filename = "Clientsoft_UI_Files.zip"

# רשימת הקבצים שצריך לכלול ב-ZIP
target_files = [
    "src/App.tsx",
    "src/components/DevicesList.tsx",
    "src/components/RemoteCommand.tsx",
    "src/components/SoftwareInstall.tsx",
    "src/components/Navbar.tsx",
    "client/src/App.tsx",
]

# בדיקה אם התיקייה קיימת
if not os.path.exists(project_dir):
    print(f"❌ שגיאה: התיקייה '{project_dir}' לא קיימת!")
    exit(1)  # יציאה מהסקריפט

print("📂 תיקיית הפרויקט נמצאה בהצלחה!\n")

# יצירת קובץ ZIP
with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for file in target_files:
        file_path = os.path.join(project_dir, file)
        if os.path.exists(file_path):
            zipf.write(file_path, arcname=file)  # שמירה על מבנה הקבצים
            print(f"✔️ הוסף לקובץ ZIP: {file}")
        else:
            print(f"⚠️ הקובץ לא נמצא: {file_path}")

# בדיקה אם הקובץ ZIP נוצר
if os.path.exists(zip_filename):
    print(f"\n🎉 קובץ ZIP נוצר בהצלחה: {zip_filename}")
else:
    print(f"❌ שגיאה: קובץ ה-ZIP לא נוצר!")