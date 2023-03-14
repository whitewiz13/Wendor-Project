import * as admin from 'firebase-admin';
import { serviceAccount } from './serviceAccount';

const firebase_params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
}

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(firebase_params),
    storageBucket: 'gs://spytest-334c7.appspot.com',
});

export default firebaseApp;