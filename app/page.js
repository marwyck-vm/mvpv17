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
  ArrowUp,
  RotateCcw,
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
  ClipboardList,
  LockKeyhole,
  LockKeyholeOpen
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
  const [newEventData, setNewEventData] = useState({ title: '', date: '', time: '', details: '', clientFile: '', teamMember: '' })
  const [eventValidationErrors, setEventValidationErrors] = useState({ title: false, date: false, time: false })
  const [dossierValidationErrors, setDossierValidationErrors] = useState({ title: false })
  const [lockedDossiers, setLockedDossiers] = useState({})
  const [showUnlockConfirm, setShowUnlockConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [pendingUnlockDossier, setPendingUnlockDossier] = useState(null)
  const [pendingDeleteDossier, setPendingDeleteDossier] = useState(null)
  const [proposeData, setProposeData] = useState({ title: '', clientFile: '', date: '', time: '', contactMode: '', infos: '' })
  const [proposeValidationErrors, setProposeValidationErrors] = useState({ title: false, clientFile: false, date: false, time: false, contactMode: false, infos: false })
  const [rescheduleData, setRescheduleData] = useState({ currentAppointment: '', newDate: '', newTime: '' })
  const [rescheduleValidationErrors, setRescheduleValidationErrors] = useState({ currentAppointment: false, newDate: false, newTime: false })
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
      joinDate: '2024-01-15',
      color: '#10B981'
    },
    { 
      id: 2, 
      name: 'Jean Martin', 
      role: 'Property Manager', 
      email: 'jean.martin@marwyck.com',
      phone: '+33 6 87 65 43 21',
      avatar: null,
      status: 'active',
      joinDate: '2024-02-20',
      color: '#8B5CF6'
    }
  ])
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([])
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
      { name: 'Listing Agreement', required: true },
      { name: 'Property Disclosure Forms', required: true },
      { name: 'Comparative Market Analysis (CMA)', required: true },
      { name: 'Preliminary Title Report', required: true },
      { name: 'Homeowners Association (HOA) Documents', required: false },
      { name: 'Marketing Authorization', required: true },
      { name: 'Inspection Reports', required: true },
      { name: 'Repair Estimates', required: false },
      { name: 'Proof of Ownership (Title Deed)', required: true },
      { name: 'Utility Bills & Property Tax Records', required: true },
      { name: 'Purchase Agreement (accepted offer)', required: true },
      { name: 'Counter Offer(s)', required: false },
      { name: 'Contingency Removal Forms', required: true },
      { name: 'Appraisal Report', required: true },
      { name: 'Final Walkthrough Form', required: true },
      { name: 'Closing Disclosure (CD)', required: true },
      { name: 'Deed (Transfer of Title)', required: true },
      { name: 'Settlement Statement / HUD-1', required: true },
      { name: 'Commission Agreement / Invoice', required: true }
    ],
    purchase: [
      { name: 'Buyer Representation Agreement', required: true },
      { name: 'Mortgage Pre-Approval Letter', required: true },
      { name: 'Proof of Funds', required: true },
      { name: 'Purchase Offer / Sales Contract', required: true },
      { name: 'Earnest Money Receipt', required: true },
      { name: 'Inspection Reports', required: true },
      { name: 'Contingency Forms', required: true },
      { name: 'Appraisal Report', required: true },
      { name: 'Title Report', required: true },
      { name: 'Title Insurance', required: true },
      { name: 'Closing Disclosure (CD)', required: true },
      { name: 'Loan Documents', required: true },
      { name: 'Homeowners Insurance Policy', required: true },
      { name: 'Settlement Statement (HUD-1)', required: true },
      { name: 'Final Walkthrough Acknowledgement', required: true },
      { name: 'Deed (received at closing)', required: true }
    ],
    rental: [
      { name: 'Listing Agreement', required: true },
      { name: 'Property Condition Report', required: true },
      { name: 'Rental Application Form', required: true },
      { name: 'Credit Report & Background Check Consent', required: true },
      { name: 'Lease Agreement / Rental Contract', required: true },
      { name: 'Lead-Based Paint Disclosure', required: true },
      { name: 'Security Deposit Receipt', required: true },
      { name: 'Pet Agreement', required: false },
      { name: 'Move-in Checklist / Condition Report', required: true },
      { name: 'Rent Payment Receipts', required: false },
      { name: 'Maintenance Request Forms', required: false },
      { name: 'Lease Renewal or Termination Notices', required: false }
    ]
  }

  const [dossiersList, setDossiersList] = useState([])

  // Calendar events organized by week (week offset from current week)
  const [calendarEventsByWeek, setCalendarEventsByWeek] = useState({
    0: [ // Current week (Jul 14 - Jul 20, 2024)
      { id: 1, title: 'Visit 123 Oak Street', date: '2024-07-15', time: '14:00', dayOfWeek: 0, type: 'visit', client: 'John Smith', description: 'Property visit with client', clientFile: '123 Oak Street', teamMember: 'Marie Dubois' },
      { id: 2, title: 'Notary signing', date: '2024-07-16', time: '16:30', dayOfWeek: 1, type: 'signature', client: 'Marie Durant', description: 'Official document signing', clientFile: '456 Pine Avenue', teamMember: '' },
      { id: 3, title: 'Estimate 456 Pine Ave', date: '2024-07-17', time: '10:00', dayOfWeek: 2, type: 'estimation', client: 'Paul Martin', description: 'Property valuation', clientFile: '456 Pine Avenue', teamMember: 'Jean Martin' }
    ],
    1: [ // Next week (Jul 21 - Jul 27, 2024)
      { id: 4, title: 'Client Meeting', date: '2024-07-22', time: '15:00', dayOfWeek: 0, type: 'meeting', client: 'Sophie Miller', description: 'Initial consultation', clientFile: '789 Maple Drive', teamMember: 'Marie Dubois' }
    ],
    '-1': [ // Previous week (Jul 7 - Jul 13, 2024)
      { id: 5, title: 'Property Tour', date: '2024-07-08', time: '11:00', dayOfWeek: 0, type: 'visit', client: 'Thomas Wilson', description: 'Guided property tour', clientFile: '123 Oak Street', teamMember: '' }
    ]
  })

  // Get events for current week
  const getCurrentWeekEvents = () => {
    return calendarEventsByWeek[currentWeek] || []
  }

  // Get dates for current week
  const getCurrentWeekDates = () => {
    const today = new Date()
    const currentDay = today.getDay() // 0 = Sunday, 1 = Monday, etc.
    const mondayOffset = currentDay === 0 ? -6 : -(currentDay - 1) // Get Monday of current week
    
    const monday = new Date(today)
    monday.setDate(today.getDate() + mondayOffset + (currentWeek * 7))
    
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      dates.push(date)
    }
    return dates
  }

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
        color: 'text-accent-cyan',
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
        color: 'text-accent-cyan',
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
        { ...baseKpis[0], value: '28.5', previousValue: '31.2', change: '-9%', color: 'text-accent-cyan', trend: 'down' },
        { ...baseKpis[1], value: '142', previousValue: '158', change: '-10%', color: 'text-accent-cyan', trend: 'down' },
        { ...baseKpis[2], value: '89%', previousValue: '92%', change: '-3%', color: 'text-accent-cyan', trend: 'down' },
        { ...baseKpis[3], value: '24', previousValue: '29', change: '-17%', color: 'text-accent-cyan', trend: 'down' }
      ]
    } else if (weekOffset === 0) {
      return baseKpis
    } else {
      // Future weeks - projected data
      return [
        { ...baseKpis[0], value: '35.8', previousValue: '32.5', change: '+10%', color: 'text-accent-cyan', trend: 'up' },
        { ...baseKpis[1], value: '164', previousValue: '156', change: '+5%', color: 'text-accent-cyan', trend: 'up' },
        { ...baseKpis[2], value: '94%', previousValue: '92%', change: '+2%', color: 'text-accent-cyan', trend: 'up' },
        { ...baseKpis[3], value: '32', previousValue: '28', change: '+14%', color: 'text-accent-cyan', trend: 'up' }
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
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200'
      case 'signed':
      case 'received':
      case 'completed':
      case 'sent':
      case 'delivered':
        return 'text-success'
      case 'missing':
      case 'failed':
        return 'text-danger'
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
      title: 'New File',
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
          content: `Hello! I'm here to help you with ${newDossier.title}. What can I assist you with today?`,
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
    const errors = {
      title: !newEventData.title,
      date: !newEventData.date,
      time: !newEventData.time
    }
    
    setEventValidationErrors(errors)
    
    if (!errors.title && !errors.date && !errors.time) {
      // Calculate day of week from date
      const eventDate = new Date(newEventData.date)
      const dayOfWeek = eventDate.getDay() // 0 = Sunday, 1 = Monday, etc.
      const mondayBasedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Convert to Monday = 0, Sunday = 6
      
      const newEvent = {
        id: Date.now(),
        title: newEventData.title,
        date: newEventData.date,
        time: newEventData.time,
        dayOfWeek: mondayBasedDay, // Add this to help with mapping
        type: 'meeting',
        client: newEventData.clientFile || 'New client',
        description: newEventData.details || 'New appointment',
        clientFile: newEventData.clientFile,
        teamMember: newEventData.teamMember
      }
      
      // Add to current week
      setCalendarEventsByWeek(prev => ({
        ...prev,
        [currentWeek]: [...(prev[currentWeek] || []), newEvent]
      }))
      
      setNewEventData({ title: '', date: '', time: '', details: '', clientFile: '', teamMember: '' })
      setEventValidationErrors({ title: false, date: false, time: false })
      setShowNewEventDialog(false)
    }
  }

  // Handle propose time slots
  const handleProposeSlots = () => {
    const errors = {
      title: !proposeData.title,
      clientFile: !proposeData.clientFile,
      date: !proposeData.date,
      time: !proposeData.time,
      contactMode: !proposeData.contactMode,
      infos: !proposeData.infos
    }
    
    setProposeValidationErrors(errors)
    
    if (!errors.title && !errors.clientFile && !errors.date && !errors.time && !errors.contactMode && !errors.infos) {
      // Simulate propose slots success
      console.log('Propose slots:', proposeData)
      setProposeData({ title: '', clientFile: '', date: '', time: '', contactMode: '', infos: '' })
      setProposeValidationErrors({ title: false, clientFile: false, date: false, time: false, contactMode: false, infos: false })
      setShowProposeDialog(false)
    }
  }

  // Handle reschedule appointment
  const handleReschedule = () => {
    const errors = {
      currentAppointment: !rescheduleData.currentAppointment,
      newDate: !rescheduleData.newDate,
      newTime: !rescheduleData.newTime
    }
    
    setRescheduleValidationErrors(errors)
    
    if (!errors.currentAppointment && !errors.newDate && !errors.newTime) {
      // Find and update the event
      const eventId = parseInt(rescheduleData.currentAppointment)
      
      // Calculate new day of week
      const newEventDate = new Date(rescheduleData.newDate)
      const newDayOfWeek = newEventDate.getDay() === 0 ? 6 : newEventDate.getDay() - 1
      
      setCalendarEventsByWeek(prev => ({
        ...prev,
        [currentWeek]: (prev[currentWeek] || []).map(event => 
          event.id === eventId 
            ? { 
                ...event, 
                date: rescheduleData.newDate, 
                time: rescheduleData.newTime,
                dayOfWeek: newDayOfWeek
              }
            : event
        )
      }))
      
      setRescheduleData({ currentAppointment: '', newDate: '', newTime: '' })
      setRescheduleValidationErrors({ currentAppointment: false, newDate: false, newTime: false })
      setShowRescheduleDialog(false)
    }
  }

  // Reset modals when they close
  const handleNewEventClose = (open) => {
    setShowNewEventDialog(open)
    if (!open) {
      setNewEventData({ title: '', date: '', time: '', details: '', clientFile: '', teamMember: '' })
      setEventValidationErrors({ title: false, date: false, time: false })
    }
  }

  const handleProposeClose = (open) => {
    setShowProposeDialog(open)
    if (!open) {
      setProposeData({ title: '', clientFile: '', date: '', time: '', contactMode: '', infos: '' })
      setProposeValidationErrors({ title: false, clientFile: false, date: false, time: false, contactMode: false, infos: false })
    }
  }

  const handleRescheduleClose = (open) => {
    setShowRescheduleDialog(open)
    if (!open) {
      setRescheduleData({ currentAppointment: '', newDate: '', newTime: '' })
      setRescheduleValidationErrors({ currentAppointment: false, newDate: false, newTime: false })
    }
  }

  // Handle event deletion
  const handleDeleteEvent = (eventId) => {
    setCalendarEventsByWeek(prev => ({
      ...prev,
      [currentWeek]: (prev[currentWeek] || []).filter(event => event.id !== eventId)
    }))
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
      // Validation: Title is required
      const errors = { title: !editingDossier.title || editingDossier.title.trim() === '' }
      setDossierValidationErrors(errors)
      
      if (errors.title) {
        return
      }
      
      setDossierValidationErrors({ title: false })
      
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

  // Function to toggle dossier status
  const toggleDossierStatus = (dossierId) => {
    setDossiersList(prev =>
      prev.map(dossier => {
        if (dossier.id === dossierId) {
          const statusOptions = ['active', 'pending', 'inactive']
          const currentIndex = statusOptions.indexOf(dossier.status)
          const nextIndex = (currentIndex + 1) % statusOptions.length
          return { ...dossier, status: statusOptions[nextIndex] }
        }
        return dossier
      })
    )
  }

  // Function to get status text in English
  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active'
      case 'pending': return 'Pending'
      case 'inactive': return 'Inactive'
      default: return status
    }
  }

  // Function to get icon by dossier type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'sale': return <Home className="w-5 h-5" style={{ color: accentColor }} />
      case 'purchase': return <DollarSign className="w-5 h-5" style={{ color: accentColor }} />
      case 'rental': return <Building className="w-5 h-5" style={{ color: accentColor }} />
      default: return <Building className="w-5 h-5" style={{ color: accentColor }} />
    }
  }

  // Function to remove contact
  const removeContact = (contactIndex) => {
    if (editingDossier) {
      const newContacts = [...(editingDossier.contacts || [])];
      newContacts.splice(contactIndex, 1);
      setEditingDossier(prev => ({ ...prev, contacts: newContacts }));
    }
  }

  // Function to toggle dossier lock
  const toggleDossierLock = (dossierId) => {
    // If currently unlocked, show unlock confirmation popup
    if (!lockedDossiers[dossierId]) {
      setPendingUnlockDossier(dossierId)
      setShowUnlockConfirm(true)
    } else {
      // If locked, unlock it directly
      setLockedDossiers(prev => ({
        ...prev,
        [dossierId]: false
      }))
    }
  }

  // Function to confirm unlock
  const confirmUnlock = () => {
    if (pendingUnlockDossier) {
      setLockedDossiers(prev => ({
        ...prev,
        [pendingUnlockDossier]: true
      }))
    }
    setShowUnlockConfirm(false)
    setPendingUnlockDossier(null)
  }

  // Function to show delete confirmation
  const showDeleteConfirmation = (dossierId) => {
    setPendingDeleteDossier(dossierId)
    setShowDeleteConfirm(true)
  }

  // Function to confirm delete
  const confirmDelete = () => {
    if (pendingDeleteDossier) {
      setDossiersList(prev => prev.filter(d => d.id !== pendingDeleteDossier))
    }
    setShowDeleteConfirm(false)
    setPendingDeleteDossier(null)
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
      <Dialog open={showAIHelp} onOpenChange={setShowAIHelp} modal={false}>
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                  <FolderOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Navigate your files</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Browse and manage your documents</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Get answers to any questions</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ask anything about your real estate business</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Track your files</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Monitor document status and progress</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Navigate your upcoming appointments</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>View and manage your schedule</p>
                </div>
              </div>
            </div>
        </DialogContent>
      </Dialog>

      {/* Planning Modal - New Event */}
      <Dialog open={showNewEventDialog} onOpenChange={handleNewEventClose} modal={false}>
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <DialogHeader>
            <DialogTitle className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Create new appointment</DialogTitle>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Create a new event in your planning</p>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                Title
                {eventValidationErrors.title && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
              </label>
              <Input 
                placeholder="Ex: Apartment visit" 
                className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'}`}
                value={newEventData.title}
                onChange={(e) => {
                  setNewEventData({...newEventData, title: e.target.value})
                  if (e.target.value) {
                    setEventValidationErrors(prev => ({...prev, title: false}))
                  }
                }}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                Date
                {eventValidationErrors.date && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
              </label>
              <Input 
                type="date" 
                className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                value={newEventData.date}
                onChange={(e) => {
                  setNewEventData({...newEventData, date: e.target.value})
                  if (e.target.value) {
                    setEventValidationErrors(prev => ({...prev, date: false}))
                  }
                }}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                Time
                {eventValidationErrors.time && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
              </label>
              <Input 
                type="time" 
                className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                value={newEventData.time}
                onChange={(e) => {
                  setNewEventData({...newEventData, time: e.target.value})
                  if (e.target.value) {
                    setEventValidationErrors(prev => ({...prev, time: false}))
                  }
                }}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Client File (Optional)</label>
              <Select value={newEventData.clientFile} onValueChange={(value) => setNewEventData({...newEventData, clientFile: value})}>
                <SelectTrigger className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
                  <SelectValue placeholder="Choose a client file" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {dossiersList.map(dossier => (
                    <SelectItem key={dossier.id} value={dossier.address}>
                      {dossier.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Team Member (Optional)</label>
              <Select value={newEventData.teamMember} onValueChange={(value) => setNewEventData({...newEventData, teamMember: value})}>
                <SelectTrigger className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
                  <SelectValue placeholder="Invite a team member" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {teamMembers.map(member => (
                    <SelectItem key={member.id} value={member.name}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Additional information</label>
              <Textarea 
                placeholder="Appointment details..." 
                className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'}`}
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
      <Dialog open={showProposeDialog} onOpenChange={handleProposeClose} modal={false}>
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <DialogHeader>
            <DialogTitle className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Propose time slots</DialogTitle>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Let Marwyck contact the client for you</p>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                Title
                {proposeValidationErrors.title && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
              </label>
              <Input 
                placeholder="Ex: Property viewing" 
                className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'}`}
                value={proposeData.title}
                onChange={(e) => {
                  setProposeData({...proposeData, title: e.target.value})
                  if (e.target.value) {
                    setProposeValidationErrors(prev => ({...prev, title: false}))
                  }
                }}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                Client/File
                {proposeValidationErrors.clientFile && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
              </label>
              <Select value={proposeData.clientFile} onValueChange={(value) => {
                setProposeData({...proposeData, clientFile: value})
                if (value) {
                  setProposeValidationErrors(prev => ({...prev, clientFile: false}))
                }
              }}>
                <SelectTrigger className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
                  <SelectValue placeholder="Choose a file" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {dossiersList.map(dossier => (
                    <SelectItem key={dossier.id} value={dossier.address}>
                      {dossier.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                Date
                {proposeValidationErrors.date && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
              </label>
              <Input 
                type="date" 
                className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                value={proposeData.date}
                onChange={(e) => {
                  setProposeData({...proposeData, date: e.target.value})
                  if (e.target.value) {
                    setProposeValidationErrors(prev => ({...prev, date: false}))
                  }
                }}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                Time
                {proposeValidationErrors.time && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
              </label>
              <Input 
                type="time" 
                className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                value={proposeData.time}
                onChange={(e) => {
                  setProposeData({...proposeData, time: e.target.value})
                  if (e.target.value) {
                    setProposeValidationErrors(prev => ({...prev, time: false}))
                  }
                }}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                Contact Mode
                {proposeValidationErrors.contactMode && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="contactMode"
                    value="sms"
                    checked={proposeData.contactMode === 'sms'}
                    onChange={(e) => {
                      setProposeData({...proposeData, contactMode: e.target.value})
                      if (e.target.value) {
                        setProposeValidationErrors(prev => ({...prev, contactMode: false}))
                      }
                    }}
                    className="mr-2"
                  />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>SMS</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="contactMode"
                    value="call"
                    checked={proposeData.contactMode === 'call'}
                    onChange={(e) => {
                      setProposeData({...proposeData, contactMode: e.target.value})
                      if (e.target.value) {
                        setProposeValidationErrors(prev => ({...prev, contactMode: false}))
                      }
                    }}
                    className="mr-2"
                  />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Call</span>
                </label>
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                More Details
                {proposeValidationErrors.infos && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
              </label>
              <Textarea 
                placeholder="Additional information about the appointment..." 
                className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'}`}
                value={proposeData.infos}
                onChange={(e) => {
                  setProposeData({...proposeData, infos: e.target.value})
                  if (e.target.value) {
                    setProposeValidationErrors(prev => ({...prev, infos: false}))
                  }
                }}
              />
            </div>
            <Button 
              onClick={handleProposeSlots}
              className="w-full text-white rounded-full" 
              style={{ backgroundColor: accentColor }}
            >
              Contact Client
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Planning Modal - Reschedule */}
      <Dialog open={showRescheduleDialog} onOpenChange={handleRescheduleClose} modal={false}>
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <DialogHeader>
            <DialogTitle className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Reschedule appointment</DialogTitle>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Change the date and time of an existing appointment</p>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                Current appointment
                {rescheduleValidationErrors.currentAppointment && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
              </label>
              <Select value={rescheduleData.currentAppointment} onValueChange={(value) => {
                setRescheduleData({...rescheduleData, currentAppointment: value})
                if (value) {
                  setRescheduleValidationErrors(prev => ({...prev, currentAppointment: false}))
                }
              }}>
                <SelectTrigger className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
                  <SelectValue placeholder="Choose appointment" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {getCurrentWeekEvents().map(event => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.title} - {event.time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                New date
                {rescheduleValidationErrors.newDate && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
              </label>
              <Input 
                type="date" 
                className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                value={rescheduleData.newDate}
                onChange={(e) => {
                  setRescheduleData({...rescheduleData, newDate: e.target.value})
                  if (e.target.value) {
                    setRescheduleValidationErrors(prev => ({...prev, newDate: false}))
                  }
                }}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                New time
                {rescheduleValidationErrors.newTime && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
              </label>
              <Input 
                type="time" 
                className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                value={rescheduleData.newTime}
                onChange={(e) => {
                  setRescheduleData({...rescheduleData, newTime: e.target.value})
                  if (e.target.value) {
                    setRescheduleValidationErrors(prev => ({...prev, newTime: false}))
                  }
                }}
              />
            </div>
            <Button 
              onClick={handleReschedule}
              className="w-full text-white rounded-full" 
              style={{ backgroundColor: accentColor }}
            >
              Reschedule
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Details Modal */}
      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails} modal={false}>
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <DialogHeader>
            <DialogTitle className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedEvent?.title}</DialogTitle>
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
            {selectedEvent?.clientFile && (
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Client File</label>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedEvent?.clientFile}</p>
              </div>
            )}
            {selectedEvent?.teamMember && (
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Invited Team Member</label>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedEvent?.teamMember}</p>
              </div>
            )}
            {selectedEvent?.description && (
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Additional Information</label>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedEvent?.description}</p>
              </div>
            )}
            <div>
              <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Options</label>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`rounded-full ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => {
                    // Pre-fill reschedule data with current event
                    setRescheduleData({
                      currentAppointment: selectedEvent?.id.toString() || '',
                      newDate: selectedEvent?.date || '',
                      newTime: selectedEvent?.time || ''
                    });
                    setShowEventDetails(false)
                    setShowRescheduleDialog(true)
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Reschedule
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
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
        <div className={`p-4 flex items-center justify-between`}>
          {!sidebarCollapsed && (
            <div>
              <img 
                src={darkMode ? "/logo-white.svg" : "/logo-black.svg"} 
                alt="MARWYCK" 
                className="h-10 w-auto max-w-[200px]"
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-2 rounded-full ${sidebarCollapsed ? 'mx-auto' : ''}`}
          >
            <Menu className={`w-4 h-4 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`} />
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
                      : `${darkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-xl`
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
              className={`w-full ${sidebarCollapsed ? 'justify-center px-2' : 'justify-start px-3'} py-2 text-sm font-medium transition-colors ${darkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-xl`}
              title={sidebarCollapsed ? 'Toggle Theme' : ''}
            >
              {darkMode ? <Sun className={`w-4 h-4 ${!sidebarCollapsed ? 'mr-3' : ''}`} /> : <Moon className={`w-4 h-4 ${!sidebarCollapsed ? 'mr-3' : ''}`} />}
              {!sidebarCollapsed && (darkMode ? 'Light Mode' : 'Dark Mode')}
            </Button>
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2 text-sm font-medium transition-colors ${
                activeTab === 'account' 
                  ? 'text-white rounded-xl' 
                  : `${darkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-xl`
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
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-8 py-4 flex items-center justify-between`}>
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
                        className={`rounded-full ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentWeek(currentWeek + 1)}
                        className={`rounded-full ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}
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

                {/* Dashboard Bottom Section - Appointments and Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                    <CardHeader>
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Upcoming Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {getCurrentWeekEvents().slice(0, 3).map(event => (
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

                  <div className="space-y-6">
                    <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                      <CardHeader>
                        <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentActivities.slice(-3).reverse().map(activity => (
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
                        <SelectTrigger className={`w-64 rounded-full ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-200 text-gray-900'}`}>
                          <SelectValue placeholder="Choose a file" />
                        </SelectTrigger>
                        <SelectContent className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                          {clients.map(client => (
                            <SelectItem 
                              key={client.id} 
                              value={client.id} 
                              className={`transition-colors ${darkMode ? 'text-gray-100 hover:!bg-gray-600' : 'text-gray-900 hover:!bg-gray-100'}`}
                              style={{ 
                                borderRadius: '8px',
                                margin: '4px 8px 4px 8px',
                                padding: '8px 12px',
                                width: 'calc(100% - 16px)',
                                maxWidth: 'calc(100% - 16px)'
                              }}
                            >
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
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`rounded-full ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => {
                        // Reset messages for current client
                        if (selectedClient !== 'general') {
                          setMessages(prev => ({
                            ...prev,
                            [selectedClient]: []
                          }))
                        } else {
                          setMessages(prev => ({
                            ...prev,
                            general: []
                          }))
                        }
                      }}
                      title="Reset conversation"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`rounded-full ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setShowAIHelp(true)}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      AI Help
                    </Button>
                  </div>
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
                      <div className={`flex items-center space-x-2 p-3 rounded-2xl ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-300'}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleFileUpload}
                          className={`p-2 rounded-full ${darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-200'}`}
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
                          className={`p-2 rounded-full ${isRecording ? 'text-red-500' : `${darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-200'}`}`}
                        >
                          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="text-white p-3 rounded-full self-center"
                      style={{ backgroundColor: accentColor }}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                  </div>
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
                        className="text-white rounded-full"
                        style={{ backgroundColor: accentColor }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Purchase
                      </Button>
                      <Button
                        onClick={() => addNewDossier('rental')}
                        size="sm"
                        className="text-white rounded-full"
                        style={{ backgroundColor: accentColor }}
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
                              {getTypeIcon(dossier.type)}
                              <span>{dossier.title || dossier.address}</span>
                            </CardTitle>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs rounded-full">
                                {dossier.type}
                              </Badge>
                              <Badge 
                                onClick={() => toggleDossierStatus(dossier.id)}
                                className={`text-xs rounded-full cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md hover:opacity-100 ${getStatusColor(dossier.status)}`}
                              >
                                {getStatusText(dossier.status)}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleDossierLock(dossier.id)}
                              className="p-2 rounded-full"
                            >
                              {lockedDossiers[dossier.id] ? (
                                <LockKeyholeOpen className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-black'}`} strokeWidth={1.5} />
                              ) : (
                                <LockKeyhole className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-black'}`} strokeWidth={1.5} />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => showDeleteConfirmation(dossier.id)}
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
                            <div className={`space-y-2 max-h-40 overflow-y-auto ${darkMode ? 'scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full' : 'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'}`} style={{scrollbarWidth: 'thin'}}>
                              {dossier.documents.map(doc => (
                                <div key={doc.id} className={`flex items-center justify-between p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800/30' : 'hover:bg-gray-100/30'}`}>
                                  <div className="flex items-center space-x-2">
                                    {getStatusIcon(doc.status)}
                                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{doc.name}</span>
                                  </div>
                                  {doc.status === 'missing' && (
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className={`text-xs rounded-full ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                                    >
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
                            <Button 
                              size="sm" 
                              onClick={() => handleEditDossier(dossier)}
                              className="w-full text-white rounded-full flex items-center" 
                              style={{ backgroundColor: accentColor }}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit file
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
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your appointments and schedule</p>
                  </div>
                  <div className="text-center mb-4">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {getWeekLabel(currentWeek).label}
                    </h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{getWeekLabel(currentWeek).date}</p>
                  </div>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentWeek(currentWeek - 1)}
                      className={`rounded-full ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentWeek(0)}
                      disabled={currentWeek === 0}
                      className={`rounded-full ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentWeek(currentWeek + 1)}
                      className={`rounded-full ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3">
                    <Card className={`rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardContent className="p-0">
                        {/* Calendar container with scroll and rounded corners */}
                        <div className="rounded-xl overflow-hidden">
                          {/* Day headers with CSS table for perfect alignment */}
                          <div className="flex bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <div className="w-20 border-r border-gray-200 dark:border-gray-700 flex items-center justify-center">
                              <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Time</span>
                            </div>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                              const weekDates = getCurrentWeekDates()
                              const dayDate = weekDates[index]
                              return (
                                <div key={day} className={`flex-1 h-16 flex flex-col items-center justify-center ${index < 6 ? 'border-r border-gray-200 dark:border-gray-700' : ''}`}>
                                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {day}
                                  </span>
                                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {dayDate.getDate()}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                          
                          {/* Scrollable hours and events area */}
                          <div className="h-[450px] overflow-y-auto">
                            <div className="flex">
                              {/* Hours column */}
                              <div className="w-20 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                                  <div key={hour} className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-start justify-center pt-1">
                                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                      {hour === 0 ? '12 AM' : 
                                       hour === 12 ? '12 PM' : 
                                       hour < 12 ? `${hour} AM` : 
                                       `${hour - 12} PM`}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              
                              {/* Days columns - using exact flex-1 like headers */}
                              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, dayIndex) => (
                                <div key={day} className={`flex-1 ${dayIndex < 6 ? 'border-r border-gray-200 dark:border-gray-700' : ''}`}>
                                  {/* Hour slots */}
                                  {Array.from({ length: 24 }, (_, hourIndex) => {
                                    const hour = hourIndex;
                                    const currentWeekEvents = getCurrentWeekEvents();
                                    const hasEvent = currentWeekEvents.find(event => 
                                      event.dayOfWeek === dayIndex && parseInt(event.time.split(':')[0]) === hour
                                    );
                                    
                                    return (
                                      <div 
                                        key={`${day}-${hour}`} 
                                        className="h-16 border-b border-gray-200 dark:border-gray-700 p-1 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer relative"
                                        onClick={() => {
                                          // Calculate the date for this slot
                                          const weekDates = getCurrentWeekDates();
                                          const slotDate = weekDates[dayIndex];
                                          const dateString = slotDate.toISOString().split('T')[0];
                                          const timeString = hour.toString().padStart(2, '0') + ':00';
                                          
                                          // Pre-fill the new event data
                                          setNewEventData({
                                            title: '',
                                            date: dateString,
                                            time: timeString,
                                            details: '',
                                            clientFile: '',
                                            teamMember: ''
                                          });
                                          setShowNewEventDialog(true);
                                        }}
                                      >
                                        {hasEvent && (
                                          <div 
                                            className="w-full h-12 rounded-xl p-2 text-xs cursor-pointer hover:shadow-md transition-shadow border-2 flex items-center justify-center"
                                            style={{ 
                                              backgroundColor: `${accentColor}40`,
                                              borderColor: accentColor
                                            }}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSelectedEvent(hasEvent);
                                              setShowEventDetails(true);
                                            }}
                                          >
                                            <p className={`font-medium text-xs text-center leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                              {hasEvent.title}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
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
                            className={`w-full rounded-full ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                            onClick={() => setShowProposeDialog(true)}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Propose slots
                          </Button>

                          <Button 
                            variant="outline" 
                            className={`w-full rounded-full ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                            onClick={() => setShowRescheduleDialog(true)}
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Reschedule
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader>
                        <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Team Planning</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {teamMembers.map(member => (
                            <div key={member.id} className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                id={`team-${member.id}`}
                                checked={selectedTeamMembers.includes(member.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedTeamMembers(prev => [...prev, member.id])
                                  } else {
                                    setSelectedTeamMembers(prev => prev.filter(id => id !== member.id))
                                  }
                                }}
                                className="w-4 h-4 rounded"
                              />
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: member.color }}
                              ></div>
                              <label 
                                htmlFor={`team-${member.id}`}
                                className={`text-sm cursor-pointer flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                              >
                                {member.name}
                              </label>
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
      <Dialog open={showEditDossier} onOpenChange={setShowEditDossier} modal={false}>
        <DialogContent className={`sm:max-w-2xl !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <DialogHeader>
            <DialogTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
              Edit File - {editingDossier?.address}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                  Title
                  {dossierValidationErrors.title && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
                </label>
                <Input 
                  value={editingDossier?.title || ''} 
                  onChange={(e) => {
                    setEditingDossier(prev => ({ ...prev, title: e.target.value }))
                    setDossierValidationErrors(prev => ({...prev, title: false}))
                  }}
                  className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} ${dossierValidationErrors.title ? 'border-red-500' : ''}`}
                  placeholder="Enter file title"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
                <Input 
                  value={editingDossier?.address || ''} 
                  onChange={(e) => setEditingDossier(prev => ({ ...prev, address: e.target.value }))}
                  className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  placeholder="Enter property address"
                />
              </div>
            </div>
            
            <div>
              <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Documents</h4>
              <div className={`space-y-2 max-h-60 overflow-y-auto ${darkMode ? 'scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full' : 'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'}`}>
                {editingDossier?.documents.map(doc => (
                  <div key={doc.id} className={`flex items-center justify-between p-3 border rounded-xl ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(doc.status)}
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{doc.name}</span>
                    </div>
                    <Select value={doc.status} onValueChange={(value) => updateDocumentStatus(doc.id, value)}>
                      <SelectTrigger className={`w-32 rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                        <SelectItem value="missing" className={`transition-colors ${darkMode ? 'text-gray-100 hover:!bg-gray-600' : 'text-gray-900 hover:!bg-gray-100'}`}>Missing</SelectItem>
                        <SelectItem value="received" className={`transition-colors ${darkMode ? 'text-gray-100 hover:!bg-gray-600' : 'text-gray-900 hover:!bg-gray-100'}`}>Received</SelectItem>
                        <SelectItem value="signed" className={`transition-colors ${darkMode ? 'text-gray-100 hover:!bg-gray-600' : 'text-gray-900 hover:!bg-gray-100'}`}>Signed</SelectItem>
                        <SelectItem value="pending" className={`transition-colors ${darkMode ? 'text-gray-100 hover:!bg-gray-600' : 'text-gray-900 hover:!bg-gray-100'}`}>Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contacts (Maximum 2)</h4>
              <div className="space-y-3">
                {editingDossier?.contacts?.slice(0, 2).map((contact, index) => (
                  <div key={index} className={`p-3 border rounded-xl ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                      <div>
                        <Input 
                          value={contact.name || ''} 
                          onChange={(e) => {
                            const newContacts = [...(editingDossier?.contacts || [])];
                            newContacts[index] = { ...newContacts[index], name: e.target.value };
                            setEditingDossier(prev => ({ ...prev, contacts: newContacts }));
                          }}
                          className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                          placeholder="Name"
                        />
                      </div>
                      <div>
                        <Input 
                          value={contact.phone || ''} 
                          onChange={(e) => {
                            const newContacts = [...(editingDossier?.contacts || [])];
                            newContacts[index] = { ...newContacts[index], phone: e.target.value };
                            setEditingDossier(prev => ({ ...prev, contacts: newContacts }));
                          }}
                          className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                          placeholder="Phone"
                        />
                      </div>
                      <div>
                        <Input 
                          value={contact.email || ''} 
                          onChange={(e) => {
                            const newContacts = [...(editingDossier?.contacts || [])];
                            newContacts[index] = { ...newContacts[index], email: e.target.value };
                            setEditingDossier(prev => ({ ...prev, contacts: newContacts }));
                          }}
                          className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                          placeholder="Email"
                        />
                      </div>
                      <div className="flex justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeContact(index)}
                          className="p-1 text-red-500 hover:text-red-700 rounded-full"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {(!editingDossier?.contacts || editingDossier.contacts.length < 2) && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      const newContacts = [...(editingDossier?.contacts || [])];
                      newContacts.push({ name: '', phone: '', email: '' });
                      setEditingDossier(prev => ({ ...prev, contacts: newContacts }));
                    }}
                    className={`w-full rounded-xl ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contact
                  </Button>
                )}
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

      {/* Unlock Confirmation Dialog */}
      <Dialog open={showUnlockConfirm} onOpenChange={setShowUnlockConfirm} modal={false}>
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <DialogHeader>
            <DialogTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
              Unlock File
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              This file will be available for team members to access and edit.
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowUnlockConfirm(false)} className="rounded-full">
              Cancel
            </Button>
            <Button onClick={confirmUnlock} className="text-white rounded-full" style={{ backgroundColor: accentColor }}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm} modal={false}>
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <DialogHeader>
            <DialogTitle className={darkMode ? 'text-white' : 'text-gray-900'}>
              Delete File
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Are you sure you want to delete <strong>{dossiersList.find(d => d.id === pendingDeleteDossier)?.title || 'this file'}</strong> permanently? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="rounded-full">
              Cancel
            </Button>
            <Button onClick={confirmDelete} className="text-white bg-red-500 hover:bg-red-600 rounded-full">
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}