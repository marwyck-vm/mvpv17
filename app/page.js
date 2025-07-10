'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { ThemeLogo } from '@/components/ui/theme-logo'
import { 
  Home, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Calculator,
  User,
  Settings,
  Sun,
  Moon,
  Send,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Calendar as CalendarIcon,
  MapPin,
  Phone,
  Mail,
  Building,
  Palette
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'

export default function MarwyckCopilot() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedClient, setSelectedClient] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello! I\'m your Marwyck Copilot. How can I help you today? You can use commands like -follow, -docs, -plan, or -estimate.', timestamp: new Date() }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [showAIHelp, setShowAIHelp] = useState(false)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [showProposeSlots, setShowProposeSlots] = useState(false)
  const [showReschedule, setShowReschedule] = useState(false)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showCreateDossier, setShowCreateDossier] = useState(false)
  const [showEditDossier, setShowEditDossier] = useState(false)
  const [selectedDossier, setSelectedDossier] = useState(null)
  const [customColor, setCustomColor] = useState('#00C4FF')

  // Sample data
  const [kpis, setKpis] = useState({
    hoursGained: 28.5,
    relancesSent: 142,
    docsCompleted: 89,
    rdvScheduled: 24
  })

  const [clients] = useState([
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@email.com', phone: '+33 1 23 45 67 89' },
    { id: 2, name: 'Marie Martin', email: 'marie.martin@email.com', phone: '+33 1 98 76 54 32' },
    { id: 3, name: 'Pierre Durand', email: 'pierre.durand@email.com', phone: '+33 1 11 22 33 44' }
  ])

  const [events, setEvents] = useState([
    { 
      id: 1, 
      title: 'Visit - 123 Main St', 
      client: 'Jean Dupont', 
      date: '2024-01-15', 
      time: '14:00', 
      type: 'visit',
      address: '123 Main Street, Paris',
      notes: 'First visit for property evaluation'
    },
    { 
      id: 2, 
      title: 'Signing - 456 Oak Ave', 
      client: 'Marie Martin', 
      date: '2024-01-16', 
      time: '10:30', 
      type: 'signing',
      address: '456 Oak Avenue, Lyon',
      notes: 'Final contract signing'
    },
    { 
      id: 3, 
      title: 'Call - Follow-up', 
      client: 'Pierre Durand', 
      date: '2024-01-17', 
      time: '16:00', 
      type: 'call',
      notes: 'Follow-up call for property interest'
    }
  ])

  const [dossiers, setDossiers] = useState([
    { 
      id: 1, 
      address: '123 Main Street, Paris', 
      type: 'sale', 
      status: 'active', 
      priority: 'high',
      client: 'Jean Dupont',
      createdAt: '2024-01-10',
      documents: [
        { id: 1, name: 'Property deed', type: 'legal', status: 'received', required: true },
        { id: 2, name: 'Energy certificate', type: 'technical', status: 'pending', required: true },
        { id: 3, name: 'Insurance', type: 'insurance', status: 'received', required: false }
      ]
    },
    { 
      id: 2, 
      address: '456 Oak Avenue, Lyon', 
      type: 'rental', 
      status: 'active', 
      priority: 'medium',
      client: 'Marie Martin',
      createdAt: '2024-01-12',
      documents: [
        { id: 4, name: 'Rental agreement', type: 'legal', status: 'received', required: true },
        { id: 5, name: 'Inventory', type: 'technical', status: 'received', required: true }
      ]
    }
  ])

  useEffect(() => {
    setMounted(true)
  }, [])

  const getWeekDates = (date) => {
    const week = []
    const startDate = new Date(date)
    const day = startDate.getDay()
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1)
    startDate.setDate(diff)
    
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      week.push(currentDate)
    }
    return week
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: newMessage,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      let response = ''
      if (newMessage.startsWith('-follow')) {
        response = 'Follow-up campaign created! I\'ll send personalized messages via SMS, email, and schedule calls based on client preferences.'
      } else if (newMessage.startsWith('-docs')) {
        response = 'Document analysis complete. I found 3 missing documents in your active dossiers. Would you like me to send automatic reminders?'
      } else if (newMessage.startsWith('-plan')) {
        response = 'Your schedule has been optimized! I found 2 time slots that could be better utilized and suggested 3 new appointments based on client availability.'
      } else if (newMessage.startsWith('-estimate')) {
        response = 'Property estimation ready! Based on recent sales and market data, the estimated value is €420,000 - €450,000. Confidence level: 85%.'
      } else {
        response = 'I understand your request. How can I help you further? Use -follow for follow-ups, -docs for documents, -plan for planning, or -estimate for property valuations.'
      }

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setChatMessages(prev => [...prev, aiMessage])
    }, 1000)

    setNewMessage('')
  }

  const handleCreateEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      date: eventData.date || new Date().toISOString().split('T')[0],
      time: eventData.time || '09:00'
    }
    setEvents(prev => [...prev, newEvent])
    setShowCreateEvent(false)
  }

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId))
    setShowEventDetails(false)
    setSelectedEvent(null)
  }

  const handleCreateDossier = (dossierData) => {
    const newDossier = {
      id: Date.now(),
      ...dossierData,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      documents: []
    }
    setDossiers(prev => [...prev, newDossier])
    setShowCreateDossier(false)
  }

  const handleEditDossier = (dossierData) => {
    setDossiers(prev => prev.map(dossier => 
      dossier.id === selectedDossier.id 
        ? { ...dossier, ...dossierData }
        : dossier
    ))
    setShowEditDossier(false)
    setSelectedDossier(null)
  }

  const handleDeleteDossier = (dossierId) => {
    setDossiers(prev => prev.filter(dossier => dossier.id !== dossierId))
  }

  const toggleDocumentStatus = (dossierId, documentId) => {
    setDossiers(prev => prev.map(dossier => {
      if (dossier.id === dossierId) {
        return {
          ...dossier,
          documents: dossier.documents.map(doc => {
            if (doc.id === documentId) {
              return {
                ...doc,
                status: doc.status === 'received' ? 'pending' : 'received'
              }
            }
            return doc
          })
        }
      }
      return dossier
    }))
  }

  if (!mounted) {
    return null
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your activity overview.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Week of {currentWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(new Date(currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Gained</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.hoursGained}h</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.relancesSent}</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.docsCompleted}</div>
            <p className="text-xs text-muted-foreground">+15% from last week</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.rdvScheduled}</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 rounded-xl">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Follow-up sent to Jean Dupont</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Document received for 123 Main St</p>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Appointment scheduled with Marie Martin</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 rounded-xl">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start rounded-lg" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create New Dossier
            </Button>
            <Button className="w-full justify-start rounded-lg" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
            <Button className="w-full justify-start rounded-lg" variant="outline">
              <Send className="mr-2 h-4 w-4" />
              Send Follow-up
            </Button>
            <Button className="w-full justify-start rounded-lg" variant="outline">
              <Calculator className="mr-2 h-4 w-4" />
              Property Estimation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderChat = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <p className="text-sm text-muted-foreground">Your intelligent real estate copilot</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-48 rounded-lg">
              <SelectValue placeholder="Select client context" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="">No specific client</SelectItem>
              {clients.map(client => (
                <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={showAIHelp} onOpenChange={setShowAIHelp}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-lg">
                <Settings className="h-4 w-4 mr-2" />
                AI Help
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-xl">
              <DialogHeader>
                <DialogTitle>AI Assistant Commands</DialogTitle>
                <DialogDescription>
                  Use these commands to interact with your AI copilot:
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">-follow [client]</h4>
                  <p className="text-sm text-muted-foreground">Create automated follow-up campaigns</p>
                </div>
                <div>
                  <h4 className="font-medium">-docs [dossier]</h4>
                  <p className="text-sm text-muted-foreground">Analyze and manage documents</p>
                </div>
                <div>
                  <h4 className="font-medium">-plan [date]</h4>
                  <p className="text-sm text-muted-foreground">Optimize your schedule and appointments</p>
                </div>
                <div>
                  <h4 className="font-medium">-estimate [address]</h4>
                  <p className="text-sm text-muted-foreground">Get property value estimations</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map(message => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-xl p-3 ${
              message.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            }`}>
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Type your message or use commands like -follow, -docs, -plan..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 rounded-lg"
          />
          <Button onClick={handleSendMessage} className="rounded-lg">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  const renderPlanning = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planning</h1>
          <p className="text-muted-foreground">Manage your appointments and schedule.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setShowCreateEvent(true)} className="rounded-lg">
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
          <Button variant="outline" onClick={() => setShowProposeSlots(true)} className="rounded-lg">
            <Calendar className="mr-2 h-4 w-4" />
            Propose Slots
          </Button>
          <Button variant="outline" onClick={() => setShowReschedule(true)} className="rounded-lg">
            <Clock className="mr-2 h-4 w-4" />
            Reschedule
          </Button>
        </div>
      </div>

      {/* Week Navigation - Moved above week display */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentWeek(new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000))}
          className="rounded-lg"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-lg font-medium">
          {currentWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - Week {Math.ceil(currentWeek.getDate() / 7)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentWeek(new Date(currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000))}
          className="rounded-lg"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {getWeekDates(currentWeek).map((date, index) => (
          <Card key={index} className="rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-center">
                {formatDate(date)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {events
                .filter(event => event.date === date.toISOString().split('T')[0])
                .map(event => (
                  <div 
                    key={event.id} 
                    className="p-2 bg-primary/10 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => {
                      setSelectedEvent(event)
                      setShowEventDetails(true)
                    }}
                  >
                    <p className="text-xs font-medium">{event.time}</p>
                    <p className="text-xs">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.client}</p>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Event Modal */}
      <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
        <DialogContent className="rounded-xl border-0 shadow-lg">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Schedule a new appointment or event.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target)
            handleCreateEvent({
              title: formData.get('title'),
              client: formData.get('client'),
              date: formData.get('date'),
              time: formData.get('time'),
              type: formData.get('type'),
              address: formData.get('address'),
              notes: formData.get('notes')
            })
          }}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input name="title" placeholder="Event title" required className="rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium">Client</label>
                <Select name="client" required>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input name="date" type="date" required className="rounded-lg" />
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <Input name="time" type="time" required className="rounded-lg" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select name="type" required>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    <SelectItem value="visit">Visit</SelectItem>
                    <SelectItem value="signing">Signing</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <Input name="address" placeholder="Property address" className="rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea name="notes" placeholder="Additional notes" className="rounded-lg" />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setShowCreateEvent(false)} className="rounded-lg">
                Cancel
              </Button>
              <Button type="submit" className="rounded-lg">Create Event</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Propose Time Slots Modal */}
      <Dialog open={showProposeSlots} onOpenChange={setShowProposeSlots}>
        <DialogContent className="rounded-xl border-0 shadow-lg">
          <DialogHeader>
            <DialogTitle>Propose Time Slots</DialogTitle>
            <DialogDescription>
              Suggest available time slots to your client.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Client</label>
              <Select>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Proposed Slots</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input type="date" className="rounded-lg" />
                  <Input type="time" className="rounded-lg" />
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" className="w-full rounded-lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Slot
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea placeholder="Personal message to client..." className="rounded-lg" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProposeSlots(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button className="rounded-lg">Send Proposals</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Modal */}
      <Dialog open={showReschedule} onOpenChange={setShowReschedule}>
        <DialogContent className="rounded-xl border-0 shadow-lg">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Move an existing appointment to a new time.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Appointment</label>
              <Select>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Choose appointment to reschedule" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {events.map(event => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.title} - {event.date} {event.time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">New Date</label>
                <Input type="date" className="rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium">New Time</label>
                <Input type="time" className="rounded-lg" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Reason</label>
              <Textarea placeholder="Reason for rescheduling..." className="rounded-lg" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReschedule(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button className="rounded-lg">Reschedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Details Modal */}
      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
        <DialogContent className="rounded-xl border-0 shadow-lg">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
            <DialogDescription>
              View and manage event information.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{selectedEvent.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedEvent.client}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <p className="text-sm">{selectedEvent.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <p className="text-sm">{selectedEvent.time}</p>
                </div>
              </div>
              {selectedEvent.address && (
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <p className="text-sm">{selectedEvent.address}</p>
                </div>
              )}
              {selectedEvent.notes && (
                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <p className="text-sm">{selectedEvent.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="destructive" 
              onClick={() => selectedEvent && handleDeleteEvent(selectedEvent.id)}
              className="rounded-lg"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button variant="outline" onClick={() => setShowEventDetails(false)} className="rounded-lg">
              Close
            </Button>
            <Button className="rounded-lg">Edit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">Manage your property dossiers and documents.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setShowCreateDossier(true)} className="rounded-lg">
            <Plus className="mr-2 h-4 w-4" />
            New Dossier
          </Button>
          <Button variant="outline" className="rounded-lg">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {dossiers.map(dossier => (
          <Card key={dossier.id} className="rounded-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>{dossier.address}</span>
                  </CardTitle>
                  <CardDescription>
                    {dossier.client} • {dossier.type} • Created {dossier.createdAt}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={dossier.priority === 'high' ? 'destructive' : dossier.priority === 'medium' ? 'default' : 'secondary'}>
                    {dossier.priority}
                  </Badge>
                  <Badge variant={dossier.status === 'active' ? 'default' : 'secondary'}>
                    {dossier.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedDossier(dossier)
                      setShowEditDossier(true)
                    }}
                    className="rounded-lg"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteDossier(dossier.id)}
                    className="rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-medium">Documents</h4>
                {dossier.documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        checked={doc.status === 'received'}
                        onCheckedChange={() => toggleDocumentStatus(dossier.id, doc.id)}
                      />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • {doc.required ? 'Required' : 'Optional'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={doc.status === 'received' ? 'default' : 'secondary'}>
                        {doc.status}
                      </Badge>
                      <Button variant="outline" size="sm" className="rounded-lg">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full rounded-lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Document
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Dossier Modal */}
      <Dialog open={showCreateDossier} onOpenChange={setShowCreateDossier}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Create New Dossier</DialogTitle>
            <DialogDescription>
              Create a new property dossier to manage documents and information.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target)
            handleCreateDossier({
              address: formData.get('address'),
              type: formData.get('type'),
              priority: formData.get('priority'),
              client: formData.get('client')
            })
          }}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Property Address</label>
                <Input name="address" placeholder="123 Main Street, City" required className="rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select name="type" required>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    <SelectItem value="sale">Sale</SelectItem>
                    <SelectItem value="rental">Rental</SelectItem>
                    <SelectItem value="purchase">Purchase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Client</label>
                <Select name="client" required>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <Select name="priority" required>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setShowCreateDossier(false)} className="rounded-lg">
                Cancel
              </Button>
              <Button type="submit" className="rounded-lg">Create Dossier</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dossier Modal */}
      <Dialog open={showEditDossier} onOpenChange={setShowEditDossier}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Edit Dossier</DialogTitle>
            <DialogDescription>
              Update dossier information.
            </DialogDescription>
          </DialogHeader>
          {selectedDossier && (
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              handleEditDossier({
                address: formData.get('address'),
                type: formData.get('type'),
                priority: formData.get('priority'),
                client: formData.get('client')
              })
            }}>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Property Address</label>
                  <Input name="address" defaultValue={selectedDossier.address} required className="rounded-lg" />
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <Select name="type" defaultValue={selectedDossier.type} required>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="rental">Rental</SelectItem>
                      <SelectItem value="purchase">Purchase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Client</label>
                  <Select name="client" defaultValue={selectedDossier.client} required>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Select name="priority" defaultValue={selectedDossier.priority} required>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setShowEditDossier(false)} className="rounded-lg">
                  Cancel
                </Button>
                <Button type="submit" className="rounded-lg">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )

  const renderEstimation = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Property Estimation</h1>
        <p className="text-muted-foreground">Get AI-powered property valuations and market analysis.</p>
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>New Estimation</CardTitle>
          <CardDescription>Enter property details for valuation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Property Address</label>
            <Input placeholder="123 Main Street, City, Postal Code" className="rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Property Type</label>
              <Select>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Surface Area (m²)</label>
              <Input type="number" placeholder="120" className="rounded-lg" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Bedrooms</label>
              <Input type="number" placeholder="3" className="rounded-lg" />
            </div>
            <div>
              <label className="text-sm font-medium">Bathrooms</label>
              <Input type="number" placeholder="2" className="rounded-lg" />
            </div>
            <div>
              <label className="text-sm font-medium">Year Built</label>
              <Input type="number" placeholder="2010" className="rounded-lg" />
            </div>
          </div>
          <Button className="w-full rounded-lg">
            <Calculator className="mr-2 h-4 w-4" />
            Generate Estimation
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Recent Estimations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">123 Main Street, Paris</h4>
                <p className="text-sm text-muted-foreground">Apartment • 85m² • 2 bedrooms</p>
              </div>
              <div className="text-right">
                <p className="font-bold">€420,000 - €450,000</p>
                <p className="text-sm text-muted-foreground">Confidence: 85%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">456 Oak Avenue, Lyon</h4>
                <p className="text-sm text-muted-foreground">House • 120m² • 3 bedrooms</p>
              </div>
              <div className="text-right">
                <p className="font-bold">€380,000 - €410,000</p>
                <p className="text-sm text-muted-foreground">Confidence: 78%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAccount = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile and application preferences.</p>
      </div>

      <div className="grid gap-6">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <Input defaultValue="John" className="rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <Input defaultValue="Doe" className="rounded-lg" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" defaultValue="john.doe@example.com" className="rounded-lg" />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input type="tel" defaultValue="+33 1 23 45 67 89" className="rounded-lg" />
            </div>
            <div>
              <label className="text-sm font-medium">Agency</label>
              <Input defaultValue="Marwyck Real Estate" className="rounded-lg" />
            </div>
            <Button className="rounded-lg">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Theme</h4>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('light')}
                  className="rounded-lg"
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                  className="rounded-lg"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Custom Color</h4>
                <p className="text-sm text-muted-foreground">Personalize your accent color</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-8 h-8 rounded border"
                />
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Palette className="h-4 w-4 mr-2" />
                  Apply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">SMS Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive urgent updates via SMS</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Desktop Notifications</h4>
                <p className="text-sm text-muted-foreground">Show browser notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard()
      case 'chat':
        return renderChat()
      case 'planning':
        return renderPlanning()
      case 'documents':
        return renderDocuments()
      case 'estimation':
        return renderEstimation()
      case 'account':
        return renderAccount()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-card border-r transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b">
          {sidebarCollapsed ? (
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
          ) : (
            <ThemeLogo width={140} height={32} className="h-8" />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {[
              { id: 'dashboard', icon: Home, label: 'Dashboard' },
              { id: 'chat', icon: MessageSquare, label: 'Chat' },
              { id: 'planning', icon: Calendar, label: 'Planning' },
              { id: 'documents', icon: FileText, label: 'Documents' },
              { id: 'estimation', icon: Calculator, label: 'Estimation' },
              { id: 'account', icon: User, label: 'Account' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === item.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* Theme Toggle & Collapse */}
        <div className="p-4 border-t space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`${sidebarCollapsed ? 'w-8 h-8 p-0' : 'w-full'} rounded-lg`}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {!sidebarCollapsed && <span className="ml-2">{theme === 'dark' ? 'Light' : 'Dark'}</span>}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`${sidebarCollapsed ? 'w-8 h-8 p-0' : 'w-full'} rounded-lg`}
          >
            <Settings className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}