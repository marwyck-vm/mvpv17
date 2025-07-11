'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Calendar,
  FileText,
  BarChart3,
  Home,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Upload,
  Download,
  Plus,
  Search,
  Filter,
  Settings,
  User,
  DollarSign,
  TrendingUp,
  Users,
  Target,
  Zap,
  Smartphone,
  Globe,
  PaperclipIcon,
  CalendarDays,
  MapPin,
  PhoneCall,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Star,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Menu,
  Code,
  Building,
  FolderOpen,
  Calculator,
  Paperclip,
  Mic,
  MicOff,
  Sun,
  Moon,
  Navigation,
  Sparkles,
  FileUp,
  MoreHorizontal,
  Info,
  UserCircle,
  Palette,
  X,
  Save,
  Copy,
  Lightbulb,
  ClipboardList
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function MarwyckCopilot() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [activeDossier, setActiveDossier] = useState('123 Oak Street')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(0)
  const [selectedClient, setSelectedClient] = useState('general')
  const [messages, setMessages] = useState({
    general: [
      {
        id: 1,
        role: 'assistant',
        content: "Hello! I'm Marwyck, your AI assistant. How can I help you today?",
        timestamp: new Date(Date.now() - 3600000)
      }
    ],
    '1': [
      {
        id: 1,
        role: 'assistant',
        content: "Hello! I can help you with 123 Oak Street. What would you like to know about this property?",
        timestamp: new Date(Date.now() - 3600000)
      }
    ],
    '2': [
      {
        id: 1,
        role: 'assistant',
        content: "Hi! I'm here to assist with 456 Pine Avenue. How can I help you today?",
        timestamp: new Date(Date.now() - 3600000)
      }
    ]
  })
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [trafficStatus, setTrafficStatus] = useState('good')
  const [darkMode, setDarkMode] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showAIHelp, setShowAIHelp] = useState(false)
  const [accentColor, setAccentColor] = useState('#00C4FF')
  const [showNewEventDialog, setShowNewEventDialog] = useState(false)
  const [showProposeDialog, setShowProposeDialog] = useState(false)
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showEditDossier, setShowEditDossier] = useState(false)
  const [selectedDossier, setSelectedDossier] = useState(null)
  const [newEventData, setNewEventData] = useState({ title: '', date: '', time: '', details: '' })
  const [editingDossier, setEditingDossier] = useState(null)
  const [meetingChecklist, setMeetingChecklist] = useState([
    { id: 1, text: "Prepare property keys", checked: false },
    { id: 2, text: "Confirm time with client", checked: false },
    { id: 3, text: "Gather all necessary documents", checked: false },
    { id: 4, text: "Check route and travel time", checked: false }
  ])
  
  // Team management state
  const [teamMembers, setTeamMembers] = useState([
    { 
      id: 1, 
      name: 'Marie Dubois', 
      role: 'Real Estate Agent', 
      email: 'marie.dubois@marwyck.com',
      phone: '+33 6 12 34 56 78',
      avatar: null,
      status: 'active',
      joinDate: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Jean Martin', 
      role: 'Property Manager', 
      email: 'jean.martin@marwyck.com',
      phone: '+33 6 87 65 43 21',
      avatar: null,
      status: 'active',
      joinDate: '2024-02-20'
    }
  ])
  const [showAddTeamMember, setShowAddTeamMember] = useState(false)
  const [newTeamMember, setNewTeamMember] = useState({ name: '', role: '', email: '', phone: '' })
  const messagesEndRef = useRef(null)

  // Available accent colors
  const accentColors = [
    { name: 'Cyan', value: '#00C4FF' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Green', value: '#10B981' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Emerald', value: '#059669' }
  ]

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simulate traffic status changes
  useEffect(() => {
    const trafficTimer = setInterval(() => {
      const statuses = ['good', 'medium', 'heavy']
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      setTrafficStatus(randomStatus)
    }, 30000)
    return () => clearInterval(trafficTimer)
  }, [])

  // Update CSS custom property when accent color changes
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-cyan', accentColor)
  }, [accentColor])

  const getTrafficColor = () => {
    switch (trafficStatus) {
      case 'good': return 'text-green-500'
      case 'medium': return 'text-orange-500'
      case 'heavy': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getTrafficText = () => {
    switch (trafficStatus) {
      case 'good': return 'Light'
      case 'medium': return 'Moderate'
      case 'heavy': return 'Heavy'
      default: return 'Unknown'
    }
  }

  // Mock data
  const dossiers = [
    { id: 1, address: '123 Oak Street', type: 'Sale', status: 'active', priority: 'high' },
    { id: 2, address: '456 Pine Avenue', type: 'Purchase', status: 'pending', priority: 'medium' },
    { id: 3, address: '789 Elm Drive', type: 'Rental', status: 'completed', priority: 'low' }
  ]

  const documentsTemplates = {
    sale: [
      { name: 'Sales agreement', required: true },
      { name: 'Technical diagnostics', required: true },
      { name: 'Insurance certificate', required: true },
      { name: 'Energy certificate', required: false },
      { name: 'Power of attorney', required: false }
    ],
    purchase: [
      { name: 'Purchase offer', required: true },
      { name: 'Income verification', required: true },
      { name: 'Financing certificate', required: true },
      { name: 'ID document', required: true }
    ],
    rental: [
      { name: 'Rental agreement', required: true },
      { name: 'Property inspection', required: true },
      { name: 'Tenant file', required: true },
      { name: 'Home insurance', required: true }
    ]
  }

  const [dossiersList, setDossiersList] = useState([
    { 
      id: 1, 
      address: '123 Oak Street', 
      type: 'sale', 
      status: 'active', 
      priority: 'high',
      contacts: [
        { id: 1, name: 'John Smith', email: 'john@email.com', phone: '+1234567890', role: 'Seller' }
      ],
      documents: [
        { id: 1, name: 'Sales agreement', type: 'PDF', status: 'signed', required: true },
        { id: 2, name: 'Technical diagnostics', type: 'PDF', status: 'received', required: true },
        { id: 3, name: 'Insurance certificate', type: 'PDF', status: 'missing', required: true }
      ]
    },
    { 
      id: 2, 
      address: '456 Pine Avenue', 
      type: 'purchase', 
      status: 'pending', 
      priority: 'medium',
      contacts: [
        { id: 2, name: 'Marie Durant', email: 'marie@email.com', phone: '+1234567891', role: 'Buyer' }
      ],
      documents: [
        { id: 4, name: 'Purchase offer', type: 'PDF', status: 'received', required: true },
        { id: 5, name: 'Income verification', type: 'PDF', status: 'missing', required: true }
      ]
    }
  ])

  const [calendarEvents, setCalendarEvents] = useState([
    { id: 1, title: 'Visit 123 Oak Street', date: '2024-12-16', time: '14:00', type: 'visit', client: 'John Smith', description: 'Property visit with client' },
    { id: 2, title: 'Notary signing', date: '2024-12-16', time: '16:30', type: 'signature', client: 'Marie Durant', description: 'Official document signing' },
    { id: 3, title: 'Estimate 456 Pine Ave', date: '2024-12-17', time: '10:00', type: 'estimation', client: 'Paul Martin', description: 'Property valuation' }
  ])

  // Dynamic clients based on dossiers
  const clients = [
    { id: 'general', name: 'General' },
    ...dossiersList.map(dossier => ({
      id: dossier.id.toString(),
      name: dossier.address
    }))
  ]

  // Get current messages for selected client
  const getCurrentMessages = () => {
    return messages[selectedClient] || []
  }

  // Add message to current client
  const addMessageToClient = (message) => {
    setMessages(prev => ({
      ...prev,
      [selectedClient]: [...(prev[selectedClient] || []), message]
    }))
  }

  // Get real week label based on current date and offset
  const getWeekLabel = (weekOffset) => {
    const today = new Date()
    const currentWeekStart = new Date(today)
    currentWeekStart.setDate(today.getDate() - today.getDay() + 1) // Monday of current week
    
    const targetWeekStart = new Date(currentWeekStart)
    targetWeekStart.setDate(currentWeekStart.getDate() + (weekOffset * 7))
    
    const targetWeekEnd = new Date(targetWeekStart)
    targetWeekEnd.setDate(targetWeekStart.getDate() + 6)
    
    const formatDate = (date) => {
      const options = { month: 'short', day: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    }
    
    const dateRange = `${formatDate(targetWeekStart)} - ${formatDate(targetWeekEnd)}`
    
    let label
    if (weekOffset === 0) {
      label = 'This week'
    } else if (weekOffset === -1) {
      label = 'Previous week'
    } else if (weekOffset === 1) {
      label = 'Next week'
    } else if (weekOffset < 0) {
      label = `${Math.abs(weekOffset)} weeks ago`
    } else {
      label = `In ${weekOffset} weeks`
    }
    
    return { date: dateRange, label }
  }

  // Dynamic KPIs based on current week
  const getKpisForWeek = (weekOffset) => {
    const baseKpis = [
      { 
        title: 'Hours Saved', 
        value: '32.5', 
        previousValue: '28.5',
        change: '+14%', 
        icon: Clock, 
        color: 'text-success',
        trend: 'up'
      },
      { 
        title: 'Follow-ups Sent', 
        value: '156', 
        previousValue: '142',
        change: '+10%', 
        icon: Send, 
        color: 'text-accent-cyan',
        trend: 'up'
      },
      { 
        title: 'Docs Completed', 
        value: '92%', 
        previousValue: '89%',
        change: '+3%', 
        icon: FileText, 
        color: 'text-success',
        trend: 'up'
      },
      { 
        title: 'Appointments Scheduled', 
        value: '28', 
        previousValue: '24',
        change: '+17%', 
        icon: Calendar, 
        color: 'text-accent-cyan',
        trend: 'up'
      }
    ]

    if (weekOffset === -1) {
      return [
        { ...baseKpis[0], value: '28.5', previousValue: '31.2', change: '-9%', color: 'text-red-500', trend: 'down' },
        { ...baseKpis[1], value: '142', previousValue: '158', change: '-10%', color: 'text-red-500', trend: 'down' },
        { ...baseKpis[2], value: '89%', previousValue: '92%', change: '-3%', color: 'text-red-500', trend: 'down' },
        { ...baseKpis[3], value: '24', previousValue: '29', change: '-17%', color: 'text-red-500', trend: 'down' }
      ]
    } else if (weekOffset === 0) {
      return baseKpis
    } else {
      // Future weeks - projected data
      return [
        { ...baseKpis[0], value: '35.8', previousValue: '32.5', change: '+10%', color: 'text-success', trend: 'up' },
        { ...baseKpis[1], value: '164', previousValue: '156', change: '+5%', color: 'text-success', trend: 'up' },
        { ...baseKpis[2], value: '94%', previousValue: '92%', change: '+2%', color: 'text-success', trend: 'up' },
        { ...baseKpis[3], value: '32', previousValue: '28', change: '+14%', color: 'text-success', trend: 'up' }
      ]
    }
  }

  const kpis = getKpisForWeek(currentWeek)

  const recentActivities = [
    { id: 1, type: 'sms', contact: 'John Smith', message: 'Visit reminder tomorrow 2pm', time: '10:30', status: 'sent' },
    { id: 2, type: 'email', contact: 'Marie Durant', message: 'Signed documents received', time: '09:15', status: 'delivered' },
    { id: 3, type: 'call', contact: 'Paul Martin', message: 'Follow-up call completed', time: '08:45', status: 'completed' }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, selectedClient])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const currentMessages = getCurrentMessages()
    const userMessage = {
      id: currentMessages.length + 1,
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    addMessageToClient(userMessage)
    setInputMessage('')
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, selectedClient)
      addMessageToClient({
        id: currentMessages.length + 2,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      })
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (message, clientId) => {
    const lowerMessage = message.toLowerCase()
    
    // Get specific dossier info if not general
    const currentDossier = clientId !== 'general' ? dossiersList.find(d => d.id.toString() === clientId) : null
    
    if (lowerMessage.includes('/followup') || lowerMessage.includes('follow')) {
      const clientName = currentDossier ? currentDossier.contacts[0]?.name || 'Client' : 'John Smith'
      return `✅ Follow-up scheduled for ${currentDossier ? currentDossier.address : 'selected property'}!\n\n📧 Email sent to ${clientName}\n📱 SMS scheduled for tomorrow 9am\n📞 Follow-up call planned\n\nWould you like to see the follow-up details?`
    }
    
    if (lowerMessage.includes('/estimate') || lowerMessage.includes('estimate')) {
      const address = currentDossier ? currentDossier.address : '123 Oak Street'
      return `🏠 Estimate generated for ${address}!\n\n💰 Range: $420,000 - $450,000\n📊 Based on 8 recent comparables\n📄 PDF report available\n\nWould you like me to send the report to the client?`
    }
    
    if (lowerMessage.includes('/appointment') || lowerMessage.includes('meeting')) {
      return "📅 Available time slots found!\n\n🕐 Tomorrow 2:00pm - 3:00pm\n🕑 Thursday 10:30am - 11:30am\n🕒 Friday 4:00pm - 5:00pm\n\nWhich time slot should I confirm?"
    }
    
    if (lowerMessage.includes('/docs') || lowerMessage.includes('documents')) {
      const address = currentDossier ? currentDossier.address : '123 Oak Street'
      const docs = currentDossier ? currentDossier.documents : []
      let docStatus = `📋 Document status for ${address}:\n\n`
      
      if (docs.length > 0) {
        docs.forEach(doc => {
          const icon = doc.status === 'signed' || doc.status === 'received' ? '✅' : doc.status === 'missing' ? '❌' : '⏳'
          docStatus += `${icon} ${doc.name} ${doc.status}\n`
        })
      } else {
        docStatus += "✅ Sales agreement signed\n✅ Diagnostics received\n❌ Insurance certificate missing\n⏳ Energy certificate pending\n"
      }
      
      docStatus += "\nSend reminders for missing documents?"
      return docStatus
    }
    
    const contextMessage = currentDossier 
      ? `I can help you with ${currentDossier.address} (${currentDossier.type}):\n\n`
      : "I can help you with:\n\n"
    
    return contextMessage + "📞 Schedule automatic follow-ups\n🏠 Estimate property values\n📅 Plan appointments\n📋 Check document status\n\nWhat would you like to do?"
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'signed':
      case 'received':
      case 'completed':
      case 'sent':
      case 'delivered':
        return 'text-success'
      case 'missing':
      case 'failed':
        return 'text-danger'
      case 'pending':
        return 'text-yellow-600'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'signed':
      case 'received':
      case 'completed':
      case 'sent':
      case 'delivered':
        return <CheckCircle2 className="w-4 h-4 text-success" />
      case 'missing':
      case 'failed':
        return <XCircle className="w-4 h-4 text-danger" />
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const addNewDossier = (type) => {
    const newDossier = {
      id: Date.now(),
      address: 'New address',
      type: type,
      status: 'active',
      priority: 'medium',
      contacts: [],
      documents: documentsTemplates[type].map((doc, index) => ({
        id: Date.now() + index,
        name: doc.name,
        type: 'PDF',
        status: 'missing',
        required: doc.required
      }))
    }
    setDossiersList(prev => [...prev, newDossier])
    
    // Initialize messages for new dossier
    setMessages(prev => ({
      ...prev,
      [newDossier.id.toString()]: [
        {
          id: 1,
          role: 'assistant',
          content: `Hello! I'm here to help you with ${newDossier.address}. What can I assist you with today?`,
          timestamp: new Date()
        }
      ]
    }))
  }

  const deleteDossier = (dossierId) => {
    setDossiersList(prev => prev.filter(d => d.id !== dossierId))
    // Remove messages for deleted dossier
    setMessages(prev => {
      const newMessages = { ...prev }
      delete newMessages[dossierId.toString()]
      return newMessages
    })
  }

  const getSuggestedActions = (dossier) => {
    const missingDocs = dossier.documents.filter(doc => doc.status === 'missing')
    const actions = []
    
    if (missingDocs.length > 0) {
      actions.push(`Send reminder for ${missingDocs.length} missing document(s)`)
    }
    
    if (dossier.type === 'sale') {
      actions.push('Schedule property visit')
      actions.push('Send estimate')
    } else if (dossier.type === 'purchase') {
      actions.push('Check financing')
      actions.push('Plan negotiation')
    } else if (dossier.type === 'rental') {
      actions.push('Check tenant file')
      actions.push('Schedule property inspection')
    }
    
    return actions
  }

  const handleFileUpload = () => {
    console.log('File upload triggered')
  }

  const handleVoiceTranscription = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      console.log('Starting voice transcription...')
      setTimeout(() => {
        setInputMessage('Transcription: Hello, I would like to schedule a visit for tomorrow.')
        setIsRecording(false)
      }, 3000)
    }
  }

  const formatDate = (date) => {
    const formatted = date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    return formatted
  }

  const eventQuickActions = [
    { id: 'reschedule', name: 'Reschedule', icon: Calendar },
    { id: 'cancel', name: 'Cancel', icon: X },
    { id: 'edit', name: 'Edit', icon: Edit },
    { id: 'duplicate', name: 'Duplicate', icon: Copy }
  ]

  const toggleChecklistItem = (id) => {
    setMeetingChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'visit': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'signature': return 'bg-green-100 text-green-800 border-green-200'
      case 'estimation': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'meeting': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Handle new event creation
  const handleCreateEvent = () => {
    if (newEventData.title && newEventData.time && newEventData.date) {
      const newEvent = {
        id: Date.now(),
        title: newEventData.title,
        date: newEventData.date,
        time: newEventData.time,
        type: 'meeting',
        client: 'New client',
        description: newEventData.details || 'New appointment'
      }
      setCalendarEvents(prev => [...prev, newEvent])
      setNewEventData({ title: '', date: '', time: '', details: '' })
      setShowNewEventDialog(false)
    }
  }

  // Handle event deletion
  const handleDeleteEvent = (eventId) => {
    setCalendarEvents(prev => prev.filter(event => event.id !== eventId))
    setShowEventDetails(false)
    setSelectedEvent(null)
  }

  // Handle dossier editing
  const handleEditDossier = (dossier) => {
    setEditingDossier({ ...dossier })
    setSelectedDossier(dossier)
    setShowEditDossier(true)
  }

  const handleSaveDossier = () => {
    if (editingDossier) {
      setDossiersList(prev => 
        prev.map(d => d.id === editingDossier.id ? editingDossier : d)
      )
      setShowEditDossier(false)
      setEditingDossier(null)
      setSelectedDossier(null)
    }
  }

  const updateDocumentStatus = (docId, newStatus) => {
    if (editingDossier) {
      setEditingDossier(prev => ({
        ...prev,
        documents: prev.documents.map(doc =>
          doc.id === docId ? { ...doc, status: newStatus } : doc
        )
      }))
    }
  }

  // Team management functions
  const handleAddTeamMember = () => {
    if (newTeamMember.name && newTeamMember.role && newTeamMember.email) {
      const newMember = {
        id: Date.now(),
        name: newTeamMember.name,
        role: newTeamMember.role,
        email: newTeamMember.email,
        phone: newTeamMember.phone || '',
        avatar: null,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0]
      }
      setTeamMembers(prev => [...prev, newMember])
      setNewTeamMember({ name: '', role: '', email: '', phone: '' })
      setShowAddTeamMember(false)
    }
  }

  const handleRemoveTeamMember = (memberId) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId))
  }

  const toggleMemberStatus = (memberId) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === memberId
          ? { ...member, status: member.status === 'active' ? 'inactive' : 'active' }
          : member
      )
    )
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Color Picker Sidebar */}
      {showColorPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className={`w-80 h-full ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-xl p-6 rounded-r-xl`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Colors
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowColorPicker(false)} className="rounded-full">
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Primary color
                </label>
                <div className="space-y-4">
                  {accentColors.map(color => (
                    <div key={color.value} className="flex items-center space-x-3">
                      <button
                        onClick={() => setAccentColor(color.value)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          accentColor === color.value ? 'border-gray-400 scale-110' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color.value }}
                      />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {color.name}
                      </span>
                      {accentColor === color.value && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button 
                  onClick={() => setShowColorPicker(false)}
                  className="w-full rounded-full text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Apply
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setShowColorPicker(false)} />
        </div>
      )}

      {/* AI Help Floating Card */}
      <Dialog open={showAIHelp} onOpenChange={setShowAIHelp}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>What I can do for you</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Schedule follow-ups</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Automatic SMS, email and call scheduling</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Property estimates</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Generate estimates based on comparables</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Schedule appointments</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Automatic calendar management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Manage documents</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Track missing documents and automatic reminders</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Planning Modal - New Event */}
      <Dialog open={showNewEventDialog} onOpenChange={setShowNewEventDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Create new appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
              <Input 
                placeholder="Ex: Apartment visit" 
                className="rounded-xl" 
                value={newEventData.title}
                onChange={(e) => setNewEventData({...newEventData, title: e.target.value})}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
              <Input 
                type="date" 
                className="rounded-xl" 
                value={newEventData.date}
                onChange={(e) => setNewEventData({...newEventData, date: e.target.value})}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time</label>
              <Input 
                type="time" 
                className="rounded-xl" 
                value={newEventData.time}
                onChange={(e) => setNewEventData({...newEventData, time: e.target.value})}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Additional information</label>
              <Textarea 
                placeholder="Appointment details..." 
                className="rounded-xl" 
                value={newEventData.details}
                onChange={(e) => setNewEventData({...newEventData, details: e.target.value})}
              />
            </div>
            <Button 
              onClick={handleCreateEvent}
              className="w-full text-white rounded-full" 
              style={{ backgroundColor: accentColor }}
            >
              Create Appointment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Planning Modal - Propose Slots */}
      <Dialog open={showProposeDialog} onOpenChange={setShowProposeDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Propose time slots</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Client/File</label>
              <Select>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Choose a file" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {dossiersList.map(dossier => (
                    <SelectItem key={dossier.id} value={dossier.id.toString()}>
                      {dossier.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date range</label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" className="rounded-xl" />
                <Input type="date" className="rounded-xl" />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Slots to propose</label>
              <Textarea placeholder="Ex: Monday 2pm-3pm, Tuesday 10:30am-11:30am..." className="rounded-xl" />
            </div>
            <Button className="w-full text-white rounded-full" style={{ backgroundColor: accentColor }}>
              <Sparkles className="w-4 h-4 mr-2" />
              Let AI propose
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Planning Modal - Reschedule */}
      <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Reschedule an appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Appointment to reschedule</label>
              <Select>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Choose an appointment" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {calendarEvents.map(event => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.title} - {event.time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>New date</label>
              <Input type="date" className="rounded-xl" />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>New time</label>
              <Input type="time" className="rounded-xl" />
            </div>
            <Button className="w-full text-white rounded-full" style={{ backgroundColor: accentColor }}>
              Reschedule
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Details Modal */}
      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedEvent?.date}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time</label>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedEvent?.time}</p>
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Client</label>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedEvent?.client}</p>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedEvent?.description}</p>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Actions</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Reschedule
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    if (selectedEvent) {
                      handleDeleteEvent(selectedEvent.id)
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Team Member Modal */}
      <Dialog open={showAddTeamMember} onOpenChange={setShowAddTeamMember}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
              <Input 
                placeholder="Full name" 
                className="rounded-xl" 
                value={newTeamMember.name}
                onChange={(e) => setNewTeamMember({...newTeamMember, name: e.target.value})}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Role</label>
              <Input 
                placeholder="e.g., Real Estate Agent" 
                className="rounded-xl" 
                value={newTeamMember.role}
                onChange={(e) => setNewTeamMember({...newTeamMember, role: e.target.value})}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <Input 
                type="email" 
                placeholder="email@example.com" 
                className="rounded-xl" 
                value={newTeamMember.email}
                onChange={(e) => setNewTeamMember({...newTeamMember, email: e.target.value})}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
              <Input 
                type="tel" 
                placeholder="+33 6 12 34 56 78" 
                className="rounded-xl" 
                value={newTeamMember.phone}
                onChange={(e) => setNewTeamMember({...newTeamMember, phone: e.target.value})}
              />
            </div>
            <Button 
              onClick={handleAddTeamMember}
              className="w-full text-white rounded-full" 
              style={{ backgroundColor: accentColor }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
        <div className={`p-4 border-b flex items-center justify-between ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div>
            <img 
              src={darkMode ? "/logo-white.svg" : "/logo-black.svg"} 
              alt="MARWYCK" 
              className="h-10 w-auto max-w-[200px]"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-full"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>
        
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'chat', label: 'Chat', icon: MessageCircle },
              { id: 'planning', label: 'Planning', icon: Calendar },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'estimation', label: 'Estimation', icon: Calculator },
              { id: 'communications', label: 'SMS & Calls', icon: Phone },
              { id: 'team', label: 'Team', icon: Users }
            ].map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2 text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'text-white rounded-xl'
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-md`
                  }`}
                  style={activeTab === item.id ? { backgroundColor: accentColor } : {}}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <item.icon className={`w-4 h-4 ${!sidebarCollapsed ? 'mr-3' : ''}`} />
                  {!sidebarCollapsed && item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className={`p-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full ${sidebarCollapsed ? 'justify-center px-2' : 'justify-start px-3'} py-2 rounded-full`}
              title={sidebarCollapsed ? 'Toggle Theme' : ''}
            >
              {darkMode ? <Sun className={`w-4 h-4 ${!sidebarCollapsed ? 'mr-3' : ''}`} /> : <Moon className={`w-4 h-4 ${!sidebarCollapsed ? 'mr-3' : ''}`} />}
              {!sidebarCollapsed && (darkMode ? 'Light Mode' : 'Dark Mode')}
            </Button>
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'account' 
                  ? 'text-white rounded-xl' 
                  : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
              }`}
              style={activeTab === 'account' ? { backgroundColor: accentColor } : {}}
              title={sidebarCollapsed ? 'Account' : ''}
            >
              <UserCircle className={`w-4 h-4 ${!sidebarCollapsed ? 'mr-3' : ''}`} />
              {!sidebarCollapsed && 'Account'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 flex items-center justify-between`}>
          <div className="flex items-center space-x-4">
            <h1 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'chat' && 'Chat'}
              {activeTab === 'planning' && 'Planning'}
              {activeTab === 'documents' && 'Documents'}
              {activeTab === 'estimation' && 'Estimation'}
              {activeTab === 'communications' && 'SMS & Calls'}
              {activeTab === 'team' && 'Team'}
              {activeTab === 'account' && 'Account'}
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            {/* Date */}
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {formatDate(currentTime)}
            </div>
            
            {/* Live Time */}
            <div className={`flex items-center space-x-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <Clock className="w-4 h-4" />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
            
            {/* Traffic Status */}
            <div className="flex items-center space-x-2">
              <Navigation className={`w-4 h-4 ${getTrafficColor()}`} />
              <span className={`text-sm ${getTrafficColor()}`}>
                Traffic nearby: {getTrafficText()}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className={`text-2xl font-bold font-plus-jakarta ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {getWeekLabel(currentWeek).label}
                      </h2>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{getWeekLabel(currentWeek).date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentWeek(currentWeek - 1)}
                        className="rounded-full"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentWeek(currentWeek + 1)}
                        className="rounded-full"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Efficiency {kpis[0].change.startsWith('+') ? 'increased' : 'decreased'} by <span className={`font-medium ${kpis[0].change.startsWith('+') ? 'text-success' : 'text-red-500'}`}>{kpis[0].change}</span> from last week
                  </p>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {kpis.map((kpi, index) => (
                    <Card key={index} className={`hover:shadow-lg transition-shadow ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {kpi.title}
                        </CardTitle>
                        <kpi.icon className={`w-4 h-4 ${kpi.color === 'text-accent-cyan' ? '' : kpi.color}`} style={kpi.color === 'text-accent-cyan' ? { color: accentColor } : {}} />
                      </CardHeader>
                      <CardContent>
                        <div className={`text-2xl font-bold font-space-grotesk mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {kpi.value}
                        </div>
                        <div className="flex items-center space-x-2">
                          <p className={`text-xs ${kpi.change.startsWith('+') ? 'text-success' : 'text-red-500'}`}>{kpi.change}</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>vs {kpi.previousValue}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                    <CardHeader>
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map(activity => (
                          <div key={activity.id} className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {activity.type === 'sms' && <Smartphone className="w-5 h-5" style={{ color: accentColor }} />}
                              {activity.type === 'email' && <Mail className="w-5 h-5" style={{ color: accentColor }} />}
                              {activity.type === 'call' && <PhoneCall className="w-5 h-5" style={{ color: accentColor }} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {activity.contact}
                              </p>
                              <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {activity.message}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{activity.time}</span>
                              {getStatusIcon(activity.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                      <CardHeader>
                        <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Upcoming Appointments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {calendarEvents.slice(0, 3).map(event => (
                            <div key={event.id} className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                <Calendar className="w-5 h-5" style={{ color: accentColor }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {event.title}
                                </p>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {event.client} • {event.time}
                                </p>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`text-xs rounded-full border ${getTypeColor(event.type)}`}
                              >
                                {event.type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                      <CardHeader>
                        <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
                          <Lightbulb className="w-5 h-5 mr-2" style={{ color: accentColor }} />
                          Meeting Preparation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          For your visit tomorrow:
                        </p>
                        <div className="space-y-2">
                          {meetingChecklist.map((item) => (
                            <div key={item.id} className="flex items-center space-x-2">
                              <button
                                onClick={() => toggleChecklistItem(item.id)}
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                                  item.checked 
                                    ? 'bg-green-500 border-green-500' 
                                    : `border-gray-300 ${darkMode ? 'border-gray-600' : ''}`
                                }`}
                              >
                                {item.checked && <CheckCircle className="w-3 h-3 text-white" />}
                              </button>
                              <span className={`text-sm ${item.checked ? 'line-through opacity-75' : ''} ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                📋 {item.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className={`text-2xl font-bold font-plus-jakarta ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Account Settings
                  </h2>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your profile and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Section */}
                  <Card className={`lg:col-span-2 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <CardHeader>
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                            <User className="w-10 h-10 text-white" />
                          </div>
                          <div>
                            <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>John Doe</h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Real Estate Agent</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                            <Input defaultValue="John Doe" className="rounded-xl" />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                            <Input defaultValue="john@marwyck.com" className="rounded-xl" />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
                            <Input defaultValue="+1 (555) 123-4567" className="rounded-xl" />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Agency</label>
                            <Input defaultValue="Marwyck Real Estate" className="rounded-xl" />
                          </div>
                        </div>
                        
                        <Button className="text-white rounded-full" style={{ backgroundColor: accentColor }}>
                          <Save className="w-4 h-4 mr-2" />
                          Update Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Statistics */}
                  <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                    <CardHeader>
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" style={{ color: accentColor }} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Hours Saved</span>
                          </div>
                          <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>847h</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" style={{ color: accentColor }} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Files Processed</span>
                          </div>
                          <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>1,234</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" style={{ color: accentColor }} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Appointments</span>
                          </div>
                          <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>456</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Send className="w-4 h-4" style={{ color: accentColor }} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Messages Sent</span>
                          </div>
                          <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>3,789</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Colors Section */}
                <Card className={`mt-6 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                  <CardHeader>
                    <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Interface Colors</CardTitle>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Customize your interface primary color</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Primary Color: <span className="capitalize" style={{ color: accentColor }}>{accentColors.find(c => c.value === accentColor)?.name.toLowerCase()}</span>
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {accentColors.map(color => (
                            <button
                              key={color.value}
                              onClick={() => setAccentColor(color.value)}
                              className={`group relative w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                                accentColor === color.value 
                                  ? 'border-gray-400 scale-110 shadow-lg' 
                                  : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                              }`}
                              style={{ backgroundColor: color.value }}
                              title={color.name}
                            >
                              {accentColor === color.value && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <CheckCircle className="w-6 h-6 text-white drop-shadow-lg" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2">
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Click on a color to change your interface theme
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Chat */}
          {activeTab === 'chat' && (
            <div className="h-full flex flex-col">
              <div className={`border-b p-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Select value={selectedClient} onValueChange={setSelectedClient}>
                        <SelectTrigger className={`w-64 rounded-full ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                          <SelectValue placeholder="Choose a file" />
                        </SelectTrigger>
                        <SelectContent className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                          {clients.map(client => (
                            <SelectItem key={client.id} value={client.id} className="rounded-lg">
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {selectedClient !== 'general' && (
                      <Badge variant="outline" style={{ borderColor: accentColor, color: accentColor }} className="rounded-full">
                        <FolderOpen className="w-3 h-3 mr-1" />
                        {clients.find(c => c.id === selectedClient)?.name}
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full"
                    onClick={() => setShowAIHelp(true)}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    AI Help
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-6">
                    {getCurrentMessages().map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="flex items-start space-x-3 max-w-2xl">
                          {message.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accentColor }}>
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div
                            className={`px-4 py-3 rounded-2xl ${
                              message.role === 'user'
                                ? `${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-900'}`
                                : `${darkMode ? 'bg-gray-800 border border-gray-700 text-white' : 'bg-white border border-gray-200 text-gray-900'} shadow-sm`
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          {message.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-3 max-w-2xl">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accentColor }}>
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <div className={`px-4 py-3 rounded-2xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: accentColor }}></div>
                                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: accentColor, animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: accentColor, animationDelay: '0.2s' }}></div>
                              </div>
                              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Marwyck is typing...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>
              
              <div className={`border-t p-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <div className={`flex items-center space-x-2 p-3 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleFileUpload}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                        >
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type your message..."
                          className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleVoiceTranscription}
                          className={`p-2 rounded-full ${isRecording ? 'text-red-500' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                        >
                          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="text-white p-3 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          {activeTab === 'documents' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className={`text-2xl font-bold font-plus-jakarta ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        File Management
                      </h2>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your files and documents</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => addNewDossier('sale')}
                        size="sm"
                        className="text-white rounded-full"
                        style={{ backgroundColor: accentColor }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Sale
                      </Button>
                      <Button
                        onClick={() => addNewDossier('purchase')}
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Purchase
                      </Button>
                      <Button
                        onClick={() => addNewDossier('rental')}
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Rental
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {dossiersList.map(dossier => (
                    <Card key={dossier.id} className={`hover:shadow-lg transition-shadow rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <CardTitle className={`text-lg font-semibold flex items-center space-x-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              <Building className="w-5 h-5" style={{ color: accentColor }} />
                              <span>{dossier.address}</span>
                            </CardTitle>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs rounded-full">
                                {dossier.type}
                              </Badge>
                              <Badge 
                                variant={dossier.status === 'active' ? 'default' : 'secondary'}
                                className="text-xs rounded-full"
                              >
                                {dossier.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditDossier(dossier)}
                              className="p-2 rounded-full"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteDossier(dossier.id)}
                              className="p-2 text-red-500 hover:text-red-700 rounded-full"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className={`font-medium text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Documents</h4>
                            <div className="space-y-2">
                              {dossier.documents.map(doc => (
                                <div key={doc.id} className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    {getStatusIcon(doc.status)}
                                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{doc.name}</span>
                                  </div>
                                  {doc.status === 'missing' && (
                                    <Button size="sm" variant="outline" className="text-xs rounded-full">
                                      Remind
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className={`font-medium text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Suggested actions</h4>
                            <div className="space-y-1">
                              {getSuggestedActions(dossier).map((action, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Target className="w-3 h-3" style={{ color: accentColor }} />
                                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{action}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="pt-2 border-t">
                            <Button size="sm" className="w-full text-white rounded-full" style={{ backgroundColor: accentColor }}>
                              Manage file
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Planning */}
          {activeTab === 'planning' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <div className="mb-4">
                    <h2 className={`text-2xl font-bold font-plus-jakarta ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Planning
                    </h2>
                  </div>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentWeek(currentWeek - 1)}
                      className="rounded-full"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentWeek(0)}
                      disabled={currentWeek === 0}
                      className="rounded-full"
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentWeek(currentWeek + 1)}
                      className="rounded-full"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-center">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {getWeekLabel(currentWeek).label}
                    </h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{getWeekLabel(currentWeek).date}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className={`rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader>
                        <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Weekly Calendar</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
                            <div key={day} className={`border-b pb-4 ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                              <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{day}</h3>
                              <div className="space-y-2">
                                {calendarEvents
                                  .filter(event => {
                                    if (index === 0) return event.id === 1
                                    if (index === 1) return event.id === 2
                                    return false
                                  })
                                  .map(event => (
                                    <div 
                                      key={event.id}
                                      className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-xl p-3 cursor-pointer hover:shadow-md transition-shadow"
                                      onClick={() => {
                                        setSelectedEvent(event)
                                        setShowEventDetails(true)
                                      }}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {event.title}
                                          </p>
                                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{event.time}</p>
                                        </div>
                                        <Badge 
                                          variant="outline" 
                                          className={`text-xs rounded-full border ${getTypeColor(event.type)}`}
                                        >
                                          {event.type}
                                        </Badge>
                                      </div>
                                    </div>
                                  ))
                                }
                                {index > 1 && (
                                  <p className={`text-sm italic ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>No appointments</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card className={`rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader>
                        <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Button 
                            className="w-full text-white rounded-full" 
                            style={{ backgroundColor: accentColor }}
                            onClick={() => setShowNewEventDialog(true)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            New Appointment
                          </Button>

                          <Button 
                            variant="outline" 
                            className="w-full rounded-full"
                            onClick={() => setShowProposeDialog(true)}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Propose slots
                          </Button>

                          <Button 
                            variant="outline" 
                            className="w-full rounded-full"
                            onClick={() => setShowRescheduleDialog(true)}
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Reschedule
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Estimation */}
          {activeTab === 'estimation' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className={`text-2xl font-bold font-plus-jakarta ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Property Estimation
                  </h2>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Get instant property value estimates</p>
                </div>

                <Card className={`rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                  <CardHeader>
                    <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
                        <Input placeholder="123 Main Street" className="rounded-xl" />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>City</label>
                        <Input placeholder="New York" className="rounded-xl" />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Property Type</label>
                        <Select>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Choose type" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Square Feet</label>
                        <Input type="number" placeholder="1500" className="rounded-xl" />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bedrooms</label>
                        <Input type="number" placeholder="3" className="rounded-xl" />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bathrooms</label>
                        <Input type="number" placeholder="2" className="rounded-xl" />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="w-full text-white rounded-full" style={{ backgroundColor: accentColor }}>
                        <Calculator className="w-4 h-4 mr-2" />
                        Generate Estimate
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`mt-6 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                  <CardHeader>
                    <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Estimated Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className={`text-4xl font-bold font-space-grotesk mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ color: accentColor }}>
                        $485,000 - $515,000
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Based on 12 comparable properties in the area
                      </p>
                      <div className="mt-6 flex justify-center space-x-4">
                        <Button variant="outline" className="rounded-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download Report
                        </Button>
                        <Button className="text-white rounded-full" style={{ backgroundColor: accentColor }}>
                          <Mail className="w-4 h-4 mr-2" />
                          Send to Client
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Communications */}
          {activeTab === 'communications' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <h2 className={`text-2xl font-bold font-plus-jakarta ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Communications History
                  </h2>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>View all SMS and call activities</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className={`lg:col-span-2 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <CardHeader>
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Communications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map(activity => (
                          <div key={activity.id} className={`p-4 rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                  {activity.type === 'sms' && <Smartphone className="w-5 h-5" style={{ color: accentColor }} />}
                                  {activity.type === 'email' && <Mail className="w-5 h-5" style={{ color: accentColor }} />}
                                  {activity.type === 'call' && <PhoneCall className="w-5 h-5" style={{ color: accentColor }} />}
                                </div>
                                <div>
                                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {activity.contact}
                                  </p>
                                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {activity.message}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</p>
                                <div className="flex items-center space-x-1">
                                  {getStatusIcon(activity.status)}
                                  <span className={`text-xs ${getStatusColor(activity.status)}`}>{activity.status}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <CardHeader>
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Smartphone className="w-4 h-4" style={{ color: accentColor }} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>SMS Sent</span>
                          </div>
                          <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>89</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" style={{ color: accentColor }} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Emails</span>
                          </div>
                          <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>156</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <PhoneCall className="w-4 h-4" style={{ color: accentColor }} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Calls</span>
                          </div>
                          <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>34</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Team */}
          {activeTab === 'team' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className={`text-2xl font-bold font-plus-jakarta ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Team Management
                    </h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your team members and collaborators</p>
                  </div>
                  <Button
                    onClick={() => setShowAddTeamMember(true)}
                    className="text-white rounded-full"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {teamMembers.map(member => (
                    <Card key={member.id} className={`rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white font-semibold text-lg">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {member.name}
                              </h3>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {member.role}
                              </p>
                            </div>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={`${member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                          >
                            {member.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {member.email}
                            </span>
                          </div>
                          {member.phone && (
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {member.phone}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              Joined {new Date(member.joinDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleMemberStatus(member.id)}
                            className="flex-1 rounded-full"
                          >
                            {member.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveTeamMember(member.id)}
                            className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {teamMembers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      No team members yet
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Start by adding your first team member
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Dossier Modal */}
      <Dialog open={showEditDossier} onOpenChange={setShowEditDossier}>
        <DialogContent className={`rounded-2xl ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} max-w-2xl`}>
          <DialogHeader>
            <DialogTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
              Edit File - {editingDossier?.address}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
                <Input 
                  value={editingDossier?.address || ''} 
                  onChange={(e) => setEditingDossier(prev => ({ ...prev, address: e.target.value }))}
                  className="rounded-xl" 
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Type</label>
                <Select 
                  value={editingDossier?.type || ''} 
                  onValueChange={(value) => setEditingDossier(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="sale">Sale</SelectItem>
                    <SelectItem value="purchase">Purchase</SelectItem>
                    <SelectItem value="rental">Rental</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Documents</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {editingDossier?.documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-xl">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(doc.status)}
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{doc.name}</span>
                    </div>
                    <Select value={doc.status} onValueChange={(value) => updateDocumentStatus(doc.id, value)}>
                      <SelectTrigger className="w-32 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="missing">Missing</SelectItem>
                        <SelectItem value="received">Received</SelectItem>
                        <SelectItem value="signed">Signed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEditDossier(false)} className="rounded-full">
                Cancel
              </Button>
              <Button onClick={handleSaveDossier} className="text-white rounded-full" style={{ backgroundColor: accentColor }}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}