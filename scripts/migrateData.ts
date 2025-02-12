const { initializeApp } = require('firebase/app')
const { getFirestore, collection, addDoc } = require('firebase/firestore')
const fs = require('fs')
const path = require('path')

const firebaseConfig = {
  apiKey: "AIzaSyAKHyKaRHwox0pqx4oNRHZpEr4hgpGpsLk",
  authDomain: "alejandriar-9d2c6.firebaseapp.com",
  projectId: "alejandriar-9d2c6",
  storageBucket: "alejandriar-9d2c6.firebasestorage.app",
  messagingSenderId: "245662175686",
  appId: "1:245662175686:web:c05e313b7e355d260522c7"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function migrateData() {
  try {
    // Leer el archivo JSON
    const jsonPath = path.join(process.cwd(), 'r', 'data.json')
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

    // Referencia a la colección
    const librosRef = collection(db, 'libros')

    // Migrar cada libro
    for (const book of jsonData) {
      const bookData = {
        title: book.name,
        author: book.author || 'Anónimo', // En caso de que no haya autor
        url: book.url,
        category: book.category,
        tags: book.tags || [],
        coverUrl: book.coverUrl || null
      }

      await addDoc(librosRef, bookData)
      console.log(`Libro migrado: ${bookData.title}`)
    }

    console.log('Migración completada exitosamente')
  } catch (error) {
    console.error('Error durante la migración:', error)
  }
}

// Ejecutar la migración
migrateData() 