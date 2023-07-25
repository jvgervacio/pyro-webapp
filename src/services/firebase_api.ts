// singleton firebase api service
import { initializeApp } from 'firebase/app';
import { Auth, Unsubscribe, User, UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { DocumentData, Firestore, QuerySnapshot, getFirestore, onSnapshot, collection, setDoc, doc, query, where, limit, getDoc} from 'firebase/firestore';
import { FirebaseStorage, UploadResult, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Database, getDatabase, onChildChanged, set, onValue, ref as db_ref, DataSnapshot, get} from 'firebase/database';
import defaultProfileImage from '@assets/images/default.png';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

class FirebaseAPI {
    private static instance: FirebaseAPI;

    private constructor() {
        initializeApp(firebaseConfig);
    }

    public static getInstance(): FirebaseAPI {
        if (!FirebaseAPI.instance) {
            FirebaseAPI.instance = new FirebaseAPI();
        }
        return FirebaseAPI.instance;
    }

    public get auth() {
        return AuthAPI.getInstance();
    }

    public get firestore() {
        return FirestoreAPI.getInstance();
    }

    public get storage() {
        return StorageAPI.getInstance();
    }

    public get database() {
        return DatabaseAPI.getInstance();
    }
    
}

class AuthAPI {
    private static instance: AuthAPI;
    private constructor() {

    }
    public static getInstance(): AuthAPI {
        if (!AuthAPI.instance) {
            AuthAPI.instance = new AuthAPI();
        }
        return AuthAPI.instance;
    }

    public get auth(): Auth {
        return getAuth();
    }

    public async createUser(email: string, password: string, data: DocumentData): Promise<User> {
        const user = (await createUserWithEmailAndPassword(this.auth, email, password)).user;
        // read default image png from asset images
        const defaultImage = await fetch(defaultProfileImage);
        const blobFile = await defaultImage.blob();
        await FirebaseAPI.getInstance().storage.uploadFileToStorage(`user_data/${user.uid}`, { name: 'profile.png', blob: blobFile });
        await FirebaseAPI.getInstance().firestore.setDocument('users', user.uid, data);
        return user;
    }

    public async signIn(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    public async signOut(): Promise<void> {
        return;
    }

    public async onAuthStateChanged(callback: (user: User | null) => void): Promise<void> {
        this.auth.onAuthStateChanged(callback);
    }

    public async getCurrentUser(): Promise<User | null> {
        return this.auth.currentUser;
    }
}

class StorageAPI {
    private static instance: StorageAPI;
    private constructor() {
        getStorage();
    }
    public static getInstance(): StorageAPI {
        if (!StorageAPI.instance) {
            StorageAPI.instance = new StorageAPI();
        }
        return StorageAPI.instance;
    }

    public get storage(): FirebaseStorage {
        return getStorage();
    }

    public async getStorageDownloadURL(path: string): Promise<string> {
        return getDownloadURL(ref(this.storage, path));
    }

    public async uploadFileToStorage(path: string, file: { name: string, blob: Blob }): Promise<UploadResult> {
        return uploadBytes(ref(this.storage, `${path}/${file.name}`), file.blob);
    }

    public async deleteFileFromStorage(path: string): Promise<void> {
        return;
    }

}
class FirestoreAPI {
    private static instance: FirestoreAPI;
    private constructor() {
        getFirestore();
    }
    public static getInstance(): FirestoreAPI {
        if (!FirestoreAPI.instance) {
            FirestoreAPI.instance = new FirestoreAPI();
        }
        return FirestoreAPI.instance;
    }

    public get firestore(): Firestore {
        return getFirestore();
    }

    public onSnapshotCollection(collection_name: string, callback: (snapshot: QuerySnapshot<DocumentData>) => void): Unsubscribe {
        return onSnapshot(collection(this.firestore, collection_name), callback);
    }

    public onSnapshotDocument(collection_name: string, document_id: string, callback: (snapshot: QuerySnapshot<DocumentData>) => void): Unsubscribe {
        return onSnapshot(query(collection(this.firestore, collection_name), where('__name__', "==", document_id), limit(1)), callback);
    }

    public async setDocument(collection_name: string, document_id: string, data: DocumentData): Promise<void> {
        return setDoc(doc(this.firestore, `${collection_name}/${document_id}`), data);
    }

    public async getDocument(collection_name: string, document_id: string): Promise<DocumentData> {
        const docRef = doc(this.firestore, `${collection_name}/${document_id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return {};
        }
    }

}

class DatabaseAPI {
    private static instance: DatabaseAPI;
    private constructor() {
        getDatabase();
    }
    public static getInstance(): DatabaseAPI {
        if (!DatabaseAPI.instance) {
            DatabaseAPI.instance = new DatabaseAPI();
        }
        return DatabaseAPI.instance;
    }

    public get database(): Database {
        return getDatabase();
    }

    public onValue(path: string, callback: (snapshot: DataSnapshot) => void): Unsubscribe {
        return onValue(db_ref(this.database, path), callback);
    }

    public onChildChanged(path: string | undefined, callback: (snapshot: DataSnapshot) => void): Unsubscribe {
        return onChildChanged(db_ref(this.database, path), callback);
    }

    public async setValue(path: string, value: any): Promise<void> {
        return set(db_ref(this.database, path), value);
    }

    public async getValue(path: string): Promise<DataSnapshot> {
        return get(db_ref(this.database, path));
    }
}

export default FirebaseAPI.getInstance();