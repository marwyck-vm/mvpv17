import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

let client = null
let db = null

async function connectToDatabase() {
  if (!client) {
    try {
      client = new MongoClient(process.env.MONGO_URL)
      await client.connect()
      db = client.db('marwyck')
      console.log('Connected to MongoDB')
    } catch (error) {
      console.error('MongoDB connection error:', error)
      throw error
    }
  }
  return db
}

// GET /api/health
async function handleHealth() {
  try {
    const database = await connectToDatabase()
    await database.admin().ping()
    return NextResponse.json({ status: 'healthy', timestamp: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json({ status: 'error', error: error.message }, { status: 500 })
  }
}

// GET /api/dossiers
async function handleGetDossiers() {
  try {
    const database = await connectToDatabase()
    const dossiers = await database.collection('dossiers').find({}).toArray()
    return NextResponse.json(dossiers)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/dossiers
async function handleCreateDossier(request) {
  try {
    const database = await connectToDatabase()
    const body = await request.json()
    const dossier = {
      id: Date.now().toString(),
      address: body.address,
      type: body.type,
      status: 'active',
      priority: body.priority || 'medium',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    await database.collection('dossiers').insertOne(dossier)
    return NextResponse.json(dossier, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET /api/messages
async function handleGetMessages() {
  try {
    const database = await connectToDatabase()
    const messages = await database.collection('messages').find({}).sort({ timestamp: 1 }).toArray()
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/messages
async function handleCreateMessage(request) {
  try {
    const database = await connectToDatabase()
    const body = await request.json()
    const message = {
      id: Date.now().toString(),
      role: body.role,
      content: body.content,
      dossierId: body.dossierId,
      timestamp: new Date()
    }
    
    await database.collection('messages').insertOne(message)
    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/relances
async function handleCreateRelance(request) {
  try {
    const database = await connectToDatabase()
    const body = await request.json()
    
    // Simulate multi-channel follow-up
    const relance = {
      id: Date.now().toString(),
      contactId: body.contactId,
      type: body.type, // 'sms', 'email', 'call'
      message: body.message,
      scheduledAt: new Date(body.scheduledAt),
      status: 'scheduled',
      createdAt: new Date()
    }
    
    await database.collection('relances').insertOne(relance)
    
    // Simulate immediate execution for demo
    const executionResult = {
      ...relance,
      status: 'sent',
      executedAt: new Date(),
      simulation: true
    }
    
    return NextResponse.json(executionResult, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET /api/documents
async function handleGetDocuments(request) {
  try {
    const database = await connectToDatabase()
    const url = new URL(request.url)
    const dossierId = url.searchParams.get('dossierId')
    
    const query = dossierId ? { dossierId } : {}
    const documents = await database.collection('documents').find(query).toArray()
    return NextResponse.json(documents)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/documents
async function handleCreateDocument(request) {
  try {
    const database = await connectToDatabase()
    const body = await request.json()
    
    const document = {
      id: Date.now().toString(),
      dossierId: body.dossierId,
      name: body.name,
      type: body.type,
      status: body.status || 'received',
      required: body.required || false,
      uploadedAt: new Date(),
      updatedAt: new Date()
    }
    
    await database.collection('documents').insertOne(document)
    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET /api/calendar
async function handleGetCalendar() {
  try {
    const database = await connectToDatabase()
    const events = await database.collection('calendar').find({}).toArray()
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/calendar
async function handleCreateEvent(request) {
  try {
    const database = await connectToDatabase()
    const body = await request.json()
    
    const event = {
      id: Date.now().toString(),
      title: body.title,
      start: new Date(body.start),
      end: new Date(body.end),
      type: body.type,
      client: body.client,
      dossierId: body.dossierId,
      createdAt: new Date()
    }
    
    await database.collection('calendar').insertOne(event)
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/estimation
async function handleCreateEstimation(request) {
  try {
    const database = await connectToDatabase()
    const body = await request.json()
    
    // Simulate property estimation
    const estimation = {
      id: Date.now().toString(),
      dossierId: body.dossierId,
      address: body.address,
      estimationLow: 420000,
      estimationHigh: 450000,
      comparables: 8,
      confidence: 85,
      createdAt: new Date(),
      simulation: true
    }
    
    await database.collection('estimations').insertOne(estimation)
    return NextResponse.json(estimation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET /api/kpis
async function handleGetKPIs() {
  try {
    const database = await connectToDatabase()
    
    // Simulate KPI calculation
    const kpis = {
      hoursGained: 28.5,
      relancesSent: 142,
      docsCompleted: 89,
      rdvScheduled: 24,
      calculatedAt: new Date()
    }
    
    return NextResponse.json(kpis)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Main router
export async function GET(request) {
  const pathname = new URL(request.url).pathname
  
  switch (pathname) {
    case '/api/health':
      return handleHealth()
    case '/api/dossiers':
      return handleGetDossiers()
    case '/api/messages':
      return handleGetMessages()
    case '/api/documents':
      return handleGetDocuments(request)
    case '/api/calendar':
      return handleGetCalendar()
    case '/api/kpis':
      return handleGetKPIs()
    default:
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

export async function POST(request) {
  const pathname = new URL(request.url).pathname
  
  switch (pathname) {
    case '/api/dossiers':
      return handleCreateDossier(request)
    case '/api/messages':
      return handleCreateMessage(request)
    case '/api/relances':
      return handleCreateRelance(request)
    case '/api/documents':
      return handleCreateDocument(request)
    case '/api/calendar':
      return handleCreateEvent(request)
    case '/api/estimation':
      return handleCreateEstimation(request)
    default:
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

export async function PUT(request) {
  return NextResponse.json({ error: 'Method not implemented' }, { status: 501 })
}

export async function DELETE(request) {
  return NextResponse.json({ error: 'Method not implemented' }, { status: 501 })
}