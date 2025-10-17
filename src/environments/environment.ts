export const environment = {
    production: false,

    // Firebase configuration
    firebase: {
        apiKey: "AIzaSyAMyff_zHj8Ew8LOaHNBef__wL0qpR9HkM",
        authDomain: "madebyjibran-careers.firebaseapp.com",
        databaseURL: "https://madebyjibran-careers-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "madebyjibran-careers",
        storageBucket: "madebyjibran-careers.appspot.com",
        messagingSenderId: "268936599933",
        appId: "1:268936599933:web:e7f02a9c6a75550870d414",
        measurementId: "G-NE7QEWBGQJ"
    },

    // Firebase Function endpoint for fetching jobs from multiple portals
    firebaseFunctionURL: "https://us-central1-madebyjibran-careers.cloudfunctions.net/fetchJobs"
};
