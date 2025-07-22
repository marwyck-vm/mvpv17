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
  UserPlus,
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
  const [currentBaseFile, setCurrentBaseFile] = useState('general') // Track the base file separately
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
  const [showChatDeleteConfirm, setShowChatDeleteConfirm] = useState(false)
  const [showSMSAIHelp, setShowSMSAIHelp] = useState(false)
  const [showFileDetailsModal, setShowFileDetailsModal] = useState(false)
  const [selectedFileForDetails, setSelectedFileForDetails] = useState(null)
  const [fileContacts, setFileContacts] = useState([])
  const [fileTitle, setFileTitle] = useState('')
  const [fileAddress, setFileAddress] = useState('')
  
  // Nouveaux états pour les modals de partage et suppression
  const [showShareFileModal, setShowShareFileModal] = useState(false)
  const [showDeleteFileConfirm, setShowDeleteFileConfirm] = useState(false)
  const [selectedFileForShare, setSelectedFileForShare] = useState(null)
  const [selectedFileForDelete, setSelectedFileForDelete] = useState(null)
  
  // États pour l'activité sélectionnée dans l'historique
  const [selectedActivity, setSelectedActivity] = useState(null)
  
  // États pour le modal de suppression de membre d'équipe
  const [showDeleteMemberConfirm, setShowDeleteMemberConfirm] = useState(false)
  const [selectedMemberForDelete, setSelectedMemberForDelete] = useState(null)

  // Functions for managing contacts
  const addContact = () => {
    if (fileContacts.length < 2) {
      const newContact = {
        id: Date.now(),
        name: '',
        email: '',
        phone: ''
      }
      setFileContacts([...fileContacts, newContact])
    }
  }

  const removeContact = (contactId) => {
    setFileContacts(fileContacts.filter(contact => contact.id !== contactId))
  }

  const updateContact = (contactId, field, value) => {
    setFileContacts(fileContacts.map(contact => 
      contact.id === contactId ? { ...contact, [field]: value } : contact
    ))
  }

  // Fonction pour mettre à jour un dossier
  const updateDossier = (dossierId, updates) => {
    setDossiersList(prevList => 
      prevList.map(dossier => 
        dossier.id === dossierId ? { ...dossier, ...updates } : dossier
      )
    )
  }

  // Fonction pour partager un dossier avec l'équipe - ouvre un modal
  const shareDossier = (dossierId, e) => {
    e.stopPropagation() // Empêcher l'ouverture du modal
    const dossier = dossiersList.find(d => d.id === dossierId)
    setSelectedFileForShare(dossier)
    setShowShareFileModal(true)
  }

  // Fonction pour supprimer un dossier - ouvre un modal de confirmation
  const deleteDossier = (dossierId, e) => {
    e.stopPropagation() // Empêcher l'ouverture du modal
    const dossier = dossiersList.find(d => d.id === dossierId)
    setSelectedFileForDelete(dossier)
    setShowDeleteFileConfirm(true)
  }

  // Fonction pour confirmer la suppression du dossier
  const confirmDeleteDossier = () => {
    if (selectedFileForDelete) {
      setDossiersList(prevList => prevList.filter(dossier => dossier.id !== selectedFileForDelete.id))
      setShowDeleteFileConfirm(false)
      setSelectedFileForDelete(null)
    }
  }

  // Fonction pour changer le type de dossier (Sale/Purchase/Rental) - garde les documents
  const switchDossierType = (dossierId) => {
    const typeOrder = ['Sale', 'Purchase', 'Rental']
    setDossiersList(prevList => 
      prevList.map(dossier => {
        if (dossier.id === dossierId) {
          const currentIndex = typeOrder.indexOf(dossier.type)
          const nextIndex = (currentIndex + 1) % typeOrder.length
          const newType = typeOrder[nextIndex]
          
          // Ne changer que le type, garder les documents existants
          return { ...dossier, type: newType }
        }
        return dossier
      })
    )
  }

  // Fonction pour changer le type depuis le modal File Details
  const changeFileDetailsType = (newType) => {
    if (selectedFileForDetails) {
      // Générer les nouveaux documents selon le type
      let newDocuments = []
      if (newType === 'Sale') {
        const saleDocuments = [
          'Listing Agreement', 'Property Disclosure Forms', 'Comparative Market Analysis (CMA)', 
          'Preliminary Title Report', 'Homeowners Association (HOA) Documents', 'Marketing Authorization', 
          'Inspection Reports', 'Repair Estimates', 'Proof of Ownership (Title Deed)', 
          'Utility Bills & Property Tax Records', 'Purchase Agreement (accepted offer)', 
          'Counter Offer(s)', 'Contingency Removal Forms', 'Appraisal Report', 
          'Final Walkthrough Form', 'Closing Disclosure (CD)', 'Deed (Transfer of Title)', 
          'Settlement Statement / HUD-1', 'Commission Agreement / Invoice'
        ]
        newDocuments = saleDocuments.map((doc, index) => ({
          id: index + 1,
          name: doc,
          status: 'none'
        }))
      } else if (newType === 'Purchase') {
        const purchaseDocuments = [
          'Buyer Representation Agreement', 'Mortgage Pre-Approval Letter', 'Proof of Funds', 
          'Purchase Offer / Sales Contract', 'Earnest Money Receipt', 'Inspection Reports', 
          'Contingency Forms', 'Appraisal Report', 'Title Report', 'Title Insurance', 
          'Closing Disclosure (CD)', 'Loan Documents', 'Homeowners Insurance Policy', 
          'Settlement Statement (HUD-1)', 'Final Walkthrough Acknowledgement', 'Deed (received at closing)'
        ]
        newDocuments = purchaseDocuments.map((doc, index) => ({
          id: index + 1,
          name: doc,
          status: 'none'
        }))
      } else if (newType === 'Rental') {
        const rentalDocuments = [
          'Listing Agreement', 'Property Condition Report', 'Rental Application Form', 
          'Credit Report & Background Check Consent', 'Lease Agreement / Rental Contract', 
          'Lead-Based Paint Disclosure', 'Security Deposit Receipt', 'Pet Agreement', 
          'Move-in Checklist / Condition Report', 'Rent Payment Receipts', 
          'Maintenance Request Forms', 'Lease Renewal or Termination Notices'
        ]
        newDocuments = rentalDocuments.map((doc, index) => ({
          id: index + 1,
          name: doc,
          status: 'none'
        }))
      }

      // Mettre à jour le dossier avec le nouveau type et les nouveaux documents
      updateDossier(selectedFileForDetails.id, {
        type: newType,
        documents: newDocuments
      })

      // Mettre à jour l'état local du modal
      setSelectedFileForDetails({
        ...selectedFileForDetails,
        type: newType,
        documents: newDocuments
      })
    }
  }

  // Gérer l'ouverture du modal File Details
  const openFileDetails = (dossier) => {
    setSelectedFileForDetails(dossier)
    setFileTitle(dossier.title || '')
    setFileAddress(dossier.address || '')
    setFileContacts(dossier.contacts || [])
    setShowFileDetailsModal(true)
  }

  // Sauvegarder les changements du modal File Details
  const saveFileDetails = () => {
    if (selectedFileForDetails) {
      updateDossier(selectedFileForDetails.id, {
        title: fileTitle,
        address: fileAddress,
        contacts: fileContacts
      })
    }
    setShowFileDetailsModal(false)
  }

  // Function to get status color for badges and selectors
  const getStatusColor = (status) => {
    switch (status) {
      case 'missing':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'none':
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  // Function to get background color for document boxes
  const getDocumentBoxColor = (status, darkMode) => {
    switch (status) {
      case 'missing':
        return darkMode 
          ? 'bg-red-900 border-red-700 hover:border-red-600' 
          : 'bg-red-50 border-red-200 hover:border-red-300'
      case 'pending':
        return darkMode 
          ? 'bg-orange-900 border-orange-700 hover:border-orange-600' 
          : 'bg-orange-50 border-orange-200 hover:border-orange-300'
      case 'completed':
        return darkMode 
          ? 'bg-green-900 border-green-700 hover:border-green-600' 
          : 'bg-green-50 border-green-200 hover:border-green-300'
      case 'none':
      default:
        return darkMode 
          ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
    }
  }
  const [accentColor, setAccentColor] = useState('#000000')
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
    { id: 1, text: "Prepare property keys", checked: false, icon: "🔑" },
    { id: 2, text: "Confirm time with client", checked: false, icon: "📞" },
    { id: 3, text: "Gather all necessary documents", checked: false, icon: "📄" },
    { id: 4, text: "Check route and travel time", checked: false, icon: "🗺️" }
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
      lastActiveTime: null, // active maintenant
      color: '#10B981'
    },
    { 
      id: 2, 
      name: 'Jean Martin', 
      role: 'Property Manager', 
      email: 'jean.martin@marwyck.com',
      phone: '+33 6 87 65 43 21',
      avatar: null,
      status: 'inactive',
      lastActiveTime: '2 hours ago',
      color: '#8B5CF6'
    }
  ])
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([])
  const [showAddTeamMember, setShowAddTeamMember] = useState(false)
  const [newTeamMember, setNewTeamMember] = useState({ name: '', role: '', email: '', phone: '' })
  const [teamMemberValidationErrors, setTeamMemberValidationErrors] = useState({ name: false, role: false, email: false, phone: false })
  
  // Send to Client states
  const [showSendToClientDialog, setShowSendToClientDialog] = useState(false)
  const [sendToClientData, setSendToClientData] = useState({ 
    selectedDossier: '', 
    selectedContacts: [] 
  })
  const [sendToClientValidationErrors, setSendToClientValidationErrors] = useState({ 
    selectedDossier: false, 
    selectedContacts: false 
  })
  
  // User profile settings
  const [userProfile, setUserProfile] = useState({
    fullName: 'Marie Dubois',
    email: 'marie@marwyck.com',
    company: 'Marwyck Real Estate'
  })
  
  const messagesEndRef = useRef(null)

  // Available accent colors - Harvey AI style: black and white only
  const accentColors = [
    { name: 'Black', value: '#000000' }
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

  const getTrafficDotColor = () => {
    switch (trafficStatus) {
      case 'good': return 'bg-green-400'
      case 'medium': return 'bg-orange-400'
      case 'heavy': return 'bg-red-400'
      default: return 'bg-gray-400'
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
    { 
      id: 1, 
      title: '',
      address: '123 Oak Street', 
      type: 'Sale', 
      status: 'active', 
      priority: 'high',
      contacts: [],
      documents: [
        { id: 1, name: 'Listing Agreement', status: 'completed' },
        { id: 2, name: 'Property Disclosure Forms', status: 'pending' },
        { id: 3, name: 'Comparative Market Analysis (CMA)', status: 'none' },
        { id: 4, name: 'Property Inspection Report', status: 'missing' }
      ]
    },
    { 
      id: 2, 
      title: '',
      address: '456 Pine Avenue', 
      type: 'Purchase', 
      status: 'pending', 
      priority: 'medium',
      contacts: [],
      documents: [
        { id: 1, name: 'Purchase Agreement', status: 'completed' },
        { id: 2, name: 'Loan Pre-approval', status: 'pending' },
        { id: 3, name: 'Property Inspection Report', status: 'none' }
      ]
    },
    { 
      id: 3, 
      title: '',
      address: '789 Elm Drive', 
      type: 'Rental', 
      status: 'completed', 
      priority: 'low',
      contacts: [],
      documents: [
        { id: 1, name: 'Rental Application Form', status: 'completed' },
        { id: 2, name: 'Lease Agreement', status: 'completed' }
      ]
    }
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

  // États pour gérer les données des dossiers
  const [dossiersList, setDossiersList] = useState([
    { 
      id: 1, 
      title: 'Sale File Example',
      address: '123 Oak Street', 
      type: 'sale', // Type sélectionné pour voir les documents
      status: 'active', 
      priority: 'high',
      contacts: [],
      documents: [
        { id: 1, name: 'Listing Agreement', status: 'completed' },
        { id: 2, name: 'Property Disclosure Forms', status: 'pending' },
        { id: 3, name: 'Comparative Market Analysis (CMA)', status: 'missing' },
        { id: 4, name: 'Preliminary Title Report', status: 'none' }
      ]
    },
    { 
      id: 2, 
      title: 'Purchase File Example',
      address: '456 Pine Avenue', 
      type: 'purchase', // Type sélectionné 
      status: 'pending', 
      priority: 'medium',
      contacts: [],
      documents: [
        { id: 1, name: 'Buyer Representation Agreement', status: 'completed' },
        { id: 2, name: 'Mortgage Pre-Approval Letter', status: 'pending' },
        { id: 3, name: 'Proof of Funds', status: 'missing' },
        { id: 4, name: 'Purchase Offer / Sales Contract', status: 'none' }
      ]
    },
    { 
      id: 3, 
      title: 'Rental File Example',
      address: '789 Elm Drive', 
      type: 'rental', // Type sélectionné
      status: 'completed', 
      priority: 'low',
      contacts: [],
      documents: [
        { id: 1, name: 'Listing Agreement', status: 'completed' },
        { id: 2, name: 'Property Condition Report', status: 'pending' },
        { id: 3, name: 'Rental Application Form', status: 'missing' },
        { id: 4, name: 'Credit Report & Background Check Consent', status: 'none' }
      ]
    }
  ])
  
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
      name: dossier.title
    }))
  ]

  // Get current messages for selected client or active chat
  const getCurrentMessages = () => {
    return messages[selectedClient] || []
  }

  // Add message to current client or active chat
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

  // Dynamic KPIs based on current week (removed Appointments Scheduled)
  const getKpisForWeek = (weekOffset) => {
    const baseKpis = [
      { 
        title: 'Hours Saved', 
        value: '32.5', 
        previousValue: '28.5',
        change: '+14%', 
        icon: Clock, 
        color: 'text-black',
        trend: 'up'
      },
      { 
        title: 'Follow-ups Sent', 
        value: '156', 
        previousValue: '142',
        change: '+10%', 
        icon: Send, 
        color: 'text-black',
        trend: 'up'
      },
      { 
        title: 'Docs Completed', 
        value: '92%', 
        previousValue: '89%',
        change: '+3%', 
        icon: FileText, 
        color: 'text-black',
        trend: 'up'
      }
    ]

    if (weekOffset === -1) {
      return [
        { ...baseKpis[0], value: '28.5', previousValue: '31.2', change: '-9%', color: 'text-black', trend: 'down' },
        { ...baseKpis[1], value: '142', previousValue: '158', change: '-10%', color: 'text-black', trend: 'down' },
        { ...baseKpis[2], value: '89%', previousValue: '92%', change: '-3%', color: 'text-black', trend: 'down' }
      ]
    } else if (weekOffset === 0) {
      return baseKpis
    } else {
      // Future weeks - projected data
      return [
        { ...baseKpis[0], value: '35.8', previousValue: '32.5', change: '+10%', color: 'text-black', trend: 'up' },
        { ...baseKpis[1], value: '164', previousValue: '156', change: '+5%', color: 'text-black', trend: 'up' },
        { ...baseKpis[2], value: '94%', previousValue: '92%', change: '+2%', color: 'text-black', trend: 'up' }
      ]
    }
  }

  const kpis = getKpisForWeek(currentWeek)

  const recentActivities = [
    { id: 1, type: 'sms', contact: 'John Smith', message: 'Visit reminder tomorrow 2pm', date: '20/07/2025', time: '10:30 AM', status: 'sent' },
    { id: 2, type: 'email', contact: 'Marie Durant', message: 'Signed documents received', date: '20/07/2025', time: '09:15 AM', status: 'delivered' },
    { id: 3, type: 'call', contact: 'Paul Martin', message: 'Follow-up call completed', date: '20/07/2025', time: '08:45 AM', status: 'completed' },
    { id: 4, type: 'sms', contact: 'Sophie Leroux', message: 'Property viewing confirmation', date: '19/07/2025', time: '02:20 PM', status: 'delivered' },
    { id: 5, type: 'email', contact: 'Michel Dubois', message: 'Contract amendment requested', date: '19/07/2025', time: '11:30 AM', status: 'pending' },
    { id: 6, type: 'call', contact: 'Clara Benoit', message: 'Initial consultation scheduled', date: '19/07/2025', time: '04:45 PM', status: 'completed' },
    { id: 7, type: 'sms', contact: 'Thomas Moreau', message: 'Appointment rescheduled to Friday', date: '18/07/2025', time: '01:15 PM', status: 'sent' },
    { id: 8, type: 'email', contact: 'Julie Rousseau', message: 'Market analysis report sent', date: '18/07/2025', time: '03:30 PM', status: 'delivered' },
    { id: 9, type: 'call', contact: 'Antoine Leroy', message: 'Property valuation discussion', date: '17/07/2025', time: '09:45 AM', status: 'completed' },
    { id: 10, type: 'sms', contact: 'Émilie Blanc', message: 'Key pickup confirmation', date: '17/07/2025', time: '12:10 PM', status: 'sent' },
    { id: 11, type: 'email', contact: 'Vincent Martin', message: 'Insurance documents pending', date: '16/07/2025', time: '10:15 AM', status: 'pending' },
    { id: 12, type: 'call', contact: 'Isabelle Petit', message: 'Closing date coordination', date: '16/07/2025', time: '05:20 PM', status: 'completed' }
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

  const addNewDossier = (type = '') => {
    // Ne pas définir de type par défaut, laisser vide
    const template = type ? (documentsTemplates[type] || []) : []
    
    const newDossier = {
      id: Date.now(),
      title: 'New File',
      address: 'New address',
      type: type, // Peut être vide
      status: 'active',
      priority: 'medium',
      contacts: [],
      documents: template.map((doc, index) => ({
        id: Date.now() + index,
        name: doc.name,
        type: 'PDF',
        status: 'none',
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
      case 'visit': return 'border border-blue-400 text-blue-900 bg-transparent hover:bg-blue-50'
      case 'signature': return 'border border-green-400 text-green-900 bg-transparent hover:bg-green-50'
      case 'estimation': return 'border border-purple-400 text-purple-900 bg-transparent hover:bg-purple-50'
      case 'meeting': return 'border border-orange-400 text-orange-900 bg-transparent hover:bg-orange-50'
      default: return 'border border-gray-400 text-gray-900 bg-transparent hover:bg-gray-50'
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

  // Handle send to client
  const handleSendToClient = () => {
    const errors = {
      selectedDossier: !sendToClientData.selectedDossier,
      selectedContacts: sendToClientData.selectedContacts.length === 0
    }
    
    setSendToClientValidationErrors(errors)
    
    if (!errors.selectedDossier && !errors.selectedContacts) {
      // Simulate sending email
      console.log('Sending email to:', sendToClientData.selectedContacts, 'for dossier:', sendToClientData.selectedDossier)
      setSendToClientData({ selectedDossier: '', selectedContacts: [] })
      setSendToClientValidationErrors({ selectedDossier: false, selectedContacts: false })
      setShowSendToClientDialog(false)
      // You could show a success message here
    }
  }

  // Handle send to client modal close
  const handleSendToClientClose = (open) => {
    setShowSendToClientDialog(open)
    if (!open) {
      setSendToClientData({ selectedDossier: '', selectedContacts: [] })
      setSendToClientValidationErrors({ selectedDossier: false, selectedContacts: false })
    }
  }

  // Toggle contact selection
  const toggleContactSelection = (contactId) => {
    setSendToClientData(prev => ({
      ...prev,
      selectedContacts: prev.selectedContacts.includes(contactId)
        ? prev.selectedContacts.filter(id => id !== contactId)
        : [...prev.selectedContacts, contactId]
    }))
    if (sendToClientData.selectedContacts.length > 0) {
      setSendToClientValidationErrors(prev => ({ ...prev, selectedContacts: false }))
    }
  }

  // Get contacts for selected dossier
  const getContactsForSelectedDossier = () => {
    if (!sendToClientData.selectedDossier) return []
    const dossier = dossiersList.find(d => d.id.toString() === sendToClientData.selectedDossier)
    return dossier ? dossier.contacts : []
  }

  // Chat interface states for SMS & Calls page
  const [smsSelectedClient, setSmsSelectedClient] = useState('general')
  const [smsMessage, setSmsMessage] = useState('')
  const [smsMessages, setSmsMessages] = useState([])
  
  // Handle SMS chat reset
  const handleSmsReset = () => {
    setSmsMessage('')
    // Remove only messages for selected client
    setSmsMessages(prev => prev.filter(msg => msg.clientId !== smsSelectedClient))
    console.log('SMS conversation reset for client:', smsSelectedClient)
  }
  
  // Handle Chat delete
  const handleDeleteChat = () => {
    // Delete the current chat
    setMessages(prev => {
      const newMessages = { ...prev }
      delete newMessages[selectedClient]
      return newMessages
    })
    
    // Find another chat in the same base file to switch to
    const baseFile = selectedClient.includes('_') ? selectedClient.split('_')[0] : selectedClient
    const remainingChats = Object.keys(messages).filter(chatId => 
      chatId !== selectedClient && (chatId === baseFile || chatId.startsWith(`${baseFile}_`))
    )
    
    if (remainingChats.length > 0) {
      // Switch to most recent remaining chat
      const latestChat = remainingChats.sort((a, b) => {
        const timestampA = a.includes('_') ? parseInt(a.split('_').pop()) : 0
        const timestampB = b.includes('_') ? parseInt(b.split('_').pop()) : 0
        return timestampB - timestampA
      })[0]
      setSelectedClient(latestChat)
    } else {
      // No other chats, go back to base file
      setSelectedClient(baseFile)
    }
    
    setShowChatDeleteConfirm(false)
  }

  const handleChatReset = () => {
    setInputMessage('')
    
    // Create a new chat ID based on current base file and timestamp
    const newChatId = `${currentBaseFile}_${Date.now()}`
    
    // Create initial AI message
    const initialMessage = {
      id: Date.now(),
      role: 'assistant',
      content: 'Hello! I\'m your Marwyck assistant. How can I help you today?',
      timestamp: new Date()
    }
    
    // Create new chat for the current base file
    setMessages(prev => ({
      ...prev,
      [newChatId]: [initialMessage]
    }))
    
    // Switch to the new chat immediately
    setSelectedClient(newChatId)
    
    console.log('New chat created for base file:', currentBaseFile, 'New chat ID:', newChatId)
  }
  
  // Handle SMS message send
  const handleSmsSend = () => {
    if (smsMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        text: smsMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        clientId: smsSelectedClient
      }
      setSmsMessages(prev => [...prev, newMessage])
      setSmsMessage('')
      
      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          text: `Message sent to ${clients.find(c => c.id === smsSelectedClient)?.name || 'client'}. SMS delivered successfully.`,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          clientId: smsSelectedClient
        }
        setSmsMessages(prev => [...prev, aiResponse])
      }, 1000)
    }
  }
  
  // Get filtered messages for selected client
  const getFilteredSmsMessages = () => {
    return smsMessages.filter(msg => msg.clientId === smsSelectedClient)
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
    // Generate default documents based on dossier type if none exist
    let documents = dossier.documents || []
    
    if (documents.length === 0 && requiredDocuments[dossier.type]) {
      documents = requiredDocuments[dossier.type].map((doc, index) => ({
        id: index + 1,
        name: doc.name,
        status: 'missing',
        required: doc.required
      }))
    }
    
    setEditingDossier({ ...dossier, documents })
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

  // Function to update document status in File Details modal
  const updateFileDetailsDocumentStatus = (docId, newStatus) => {
    if (selectedFileForDetails) {
      const updatedFile = {
        ...selectedFileForDetails,
        documents: selectedFileForDetails.documents.map(doc =>
          doc.id === docId ? { ...doc, status: newStatus } : doc
        )
      }
      setSelectedFileForDetails(updatedFile)
      
      // Also update the main dossiers list
      setDossiersList(prev => 
        prev.map(dossier => 
          dossier.id === selectedFileForDetails.id 
            ? updatedFile
            : dossier
        )
      )
    }
  }

  // Function to save File Details changes
  const saveFileDetailsChanges = () => {
    if (selectedFileForDetails) {
      const updatedFile = {
        ...selectedFileForDetails,
        title: fileTitle,
        address: fileAddress,
        contacts: fileContacts
      }
      
      // Update the main dossiers list
      setDossiersList(prev => 
        prev.map(dossier => 
          dossier.id === selectedFileForDetails.id 
            ? updatedFile
            : dossier
        )
      )
      
      // Update the selected file for details
      setSelectedFileForDetails(updatedFile)
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
      case 'sale': return <Home className="w-5 h-5" style={{ color: '#000000' }} />
      case 'purchase': return <DollarSign className="w-5 h-5" style={{ color: '#000000' }} />
      case 'rental': return <Building className="w-5 h-5" style={{ color: '#000000' }} />
      default: return <Building className="w-5 h-5" style={{ color: '#000000' }} />
    }
  }

  // Function to remove contact
  const removeEditingContact = (contactIndex) => {
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
    // Validation des champs
    const errors = {
      name: !newTeamMember.name.trim(),
      role: !newTeamMember.role.trim(),
      email: !newTeamMember.email.trim(),
      phone: !newTeamMember.phone.trim()
    }
    
    setTeamMemberValidationErrors(errors)
    
    // Si il y a des erreurs, ne pas continuer
    if (Object.values(errors).some(error => error)) {
      return
    }
    
    // Si tous les champs sont remplis
    const newMember = {
      id: Date.now(),
      name: newTeamMember.name,
      role: newTeamMember.role,
      email: newTeamMember.email,
      phone: newTeamMember.phone,
      avatar: null,
      status: 'active',
      lastActiveTime: null,
      color: '#10B981'
    }
    
    setTeamMembers(prev => [...prev, newMember])
    setNewTeamMember({ name: '', role: '', email: '', phone: '' })
    setTeamMemberValidationErrors({ name: false, role: false, email: false, phone: false })
    setShowAddTeamMember(false)
  }

  const handleRemoveTeamMember = (memberId) => {
    const member = teamMembers.find(m => m.id === memberId)
    setSelectedMemberForDelete(member)
    setShowDeleteMemberConfirm(true)
  }

  const confirmDeleteMember = () => {
    if (selectedMemberForDelete) {
      setTeamMembers(prev => prev.filter(member => member.id !== selectedMemberForDelete.id))
      setShowDeleteMemberConfirm(false)
      setSelectedMemberForDelete(null)
    }
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
      {/* Color Picker Sidebar - Removed for Harvey AI style */}

      {/* AI Help Floating Card */}
      <Dialog open={showAIHelp} onOpenChange={setShowAIHelp} modal={false}>
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FolderOpen className="w-5 h-5 text-black" />
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Navigate your files</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Browse and manage your documents</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-black" />
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Get answers to any questions</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ask anything about your real estate business</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-black" />
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Track your files</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Monitor document status and progress</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-black" />
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Navigate your upcoming appointments</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>View and manage your schedule</p>
                </div>
              </div>
            </div>
        </DialogContent>
      </Dialog>

      {/* SMS & Calls AI Help Floating Card */}
      <Dialog open={showSMSAIHelp} onOpenChange={setShowSMSAIHelp} modal={false}>
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI phone and SMS follow-ups</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Automate your client communications</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
                  <PhoneCall className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Marwyck can schedule calls</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Plan and organize your calls automatically</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Optimize your time with Marwyck</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Save time on your communication tasks</p>
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
              style={{ backgroundColor: '#000000' }}
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
              style={{ backgroundColor: '#000000' }}
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
              style={{ backgroundColor: '#000000' }}
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

      {/* Send to Client Modal */}
      <Dialog open={showSendToClientDialog} onOpenChange={handleSendToClientClose} modal={false}>
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <DialogHeader>
            <DialogTitle className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Send Estimation to Client</DialogTitle>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Choose client file and contacts to send the estimation report</p>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                Client File
                {sendToClientValidationErrors.selectedDossier && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
              </label>
              <Select value={sendToClientData.selectedDossier} onValueChange={(value) => {
                setSendToClientData(prev => ({ ...prev, selectedDossier: value, selectedContacts: [] }))
                if (value) {
                  setSendToClientValidationErrors(prev => ({ ...prev, selectedDossier: false }))
                }
              }}>
                <SelectTrigger className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
                  <SelectValue placeholder="Select client file" />
                </SelectTrigger>
                <SelectContent 
                  className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}
                  style={{
                    width: 'var(--radix-select-trigger-width)',
                    maxWidth: 'var(--radix-select-trigger-width)',
                    minWidth: 'var(--radix-select-trigger-width)'
                  }}
                >
                  {dossiersList.map(dossier => (
                    <SelectItem 
                      key={dossier.id} 
                      value={dossier.id.toString()} 
                      className={`transition-colors ${darkMode ? 'text-gray-100 hover:!bg-gray-600' : 'text-gray-900 hover:!bg-gray-100'}`}
                      style={{ 
                        borderRadius: '8px',
                        margin: '4px 8px 4px 8px',
                        padding: '8px 12px',
                        width: 'calc(100% - 16px)',
                        maxWidth: 'calc(100% - 16px)'
                      }}
                    >
                      {dossier.title} ({dossier.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {sendToClientData.selectedDossier && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center`}>
                  Contacts to Send
                  {sendToClientValidationErrors.selectedContacts && <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />}
                </label>
                {getContactsForSelectedDossier().length === 0 ? (
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} italic p-3 border rounded-xl ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    No contacts available for this client file
                  </div>
                ) : (
                  <div className="space-y-2">
                    {getContactsForSelectedDossier().map(contact => (
                      <div key={contact.id} className={`flex items-center justify-between p-3 border rounded-xl ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                        <div className="flex-1">
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{contact.name}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{contact.email}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{contact.phone}</div>
                        </div>
                        <input
                          type="checkbox"
                          id={`contact-${contact.id}`}
                          checked={sendToClientData.selectedContacts.includes(contact.id)}
                          onChange={() => {
                            toggleContactSelection(contact.id)
                            if (sendToClientData.selectedContacts.length > 0) {
                              setSendToClientValidationErrors(prev => ({ ...prev, selectedContacts: false }))
                            }
                          }}
                          className="ml-3"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <Button 
              onClick={handleSendToClient}
              className="w-full text-white rounded-full" 
              style={{ backgroundColor: '#000000' }}
              disabled={!sendToClientData.selectedDossier || sendToClientData.selectedContacts.length === 0}
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Team Member Modal */}
      <Dialog 
        open={showAddTeamMember} 
        onOpenChange={(open) => {
          setShowAddTeamMember(open)
          if (!open) {
            // Reset erreurs et formulaire quand on ferme le modal
            setTeamMemberValidationErrors({ name: false, role: false, email: false, phone: false })
            setNewTeamMember({ name: '', role: '', email: '', phone: '' })
          }
        }} 
        modal={false}
      >
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <DialogHeader>
            <DialogTitle className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Add Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                {teamMemberValidationErrors.name && (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
              </div>
              <Input 
                placeholder="Full name" 
                className={`rounded-xl ${teamMemberValidationErrors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                value={newTeamMember.name}
                onChange={(e) => setNewTeamMember({...newTeamMember, name: e.target.value})}
              />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Role</label>
                {teamMemberValidationErrors.role && (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
              </div>
              <Input 
                placeholder="e.g., Real Estate Agent" 
                className={`rounded-xl ${teamMemberValidationErrors.role ? 'border-red-500 focus:border-red-500' : ''}`}
                value={newTeamMember.role}
                onChange={(e) => setNewTeamMember({...newTeamMember, role: e.target.value})}
              />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                {teamMemberValidationErrors.email && (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
              </div>
              <Input 
                placeholder="email@example.com" 
                type="email" 
                className={`rounded-xl ${teamMemberValidationErrors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                value={newTeamMember.email}
                onChange={(e) => setNewTeamMember({...newTeamMember, email: e.target.value})}
              />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
                {teamMemberValidationErrors.phone && (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
              </div>
              <Input 
                placeholder="+33 6 12 34 56 78" 
                type="tel" 
                className={`rounded-xl ${teamMemberValidationErrors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                value={newTeamMember.phone}
                onChange={(e) => setNewTeamMember({...newTeamMember, phone: e.target.value})}
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowAddTeamMember(false)
                setTeamMemberValidationErrors({ name: false, role: false, email: false, phone: false })
              }}
              className={`flex-1 rounded-full ${darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300'}`}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddTeamMember}
              className="flex-1 text-white rounded-full" 
              style={{ backgroundColor: '#000000' }}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
        <div className={`p-4 flex items-center justify-between`}>
          {sidebarCollapsed ? (
            <div className="group relative w-8 h-8">
              <img 
                src="/favicon_noir.png" 
                alt="MARWYCK" 
                className="w-8 h-8 dark:hidden cursor-pointer group-hover:opacity-0 transition-opacity object-contain"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
              <img 
                src="/favicon_blanc.png" 
                alt="MARWYCK" 
                className="w-8 h-8 hidden dark:block cursor-pointer group-hover:opacity-0 transition-opacity object-contain"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 p-2 rounded-full transition-opacity w-8 h-8"
              >
                <Menu className={`w-4 h-4 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`} />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center h-8">
                <img 
                  src="/logo_noir.svg" 
                  alt="MARWYCK" 
                  className="h-6 w-auto dark:hidden"
                  style={{ maxWidth: '120px' }}
                />
                <img 
                  src="/logo_blanc.svg" 
                  alt="MARWYCK" 
                  className="h-6 w-auto hidden dark:block"
                  style={{ maxWidth: '120px' }}
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-full"
              >
                <Menu className={`w-4 h-4 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`} />
              </Button>
            </>
          )}
        </div>
        
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'chat', label: 'Chat', icon: MessageCircle },
              { id: 'planning', label: 'Planning', icon: Calendar },
              { id: 'documents', label: 'Vault', icon: FolderOpen },
              { id: 'estimation', label: 'Estimation', icon: Calculator },
              { id: 'communications', label: 'History', icon: RotateCcw },
              { id: 'team', label: 'Team', icon: Users }
            ].map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2 text-sm font-medium transition-colors ${
                    activeTab === item.id 
                      ? `text-black bg-gray-100 rounded-xl font-semibold`
                      : `${darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'} rounded-xl`
                  }`}
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
              onClick={() => {/* Add help center functionality here */}}
              className={`w-full ${sidebarCollapsed ? 'justify-center px-2' : 'justify-start px-3'} py-2 text-sm font-medium transition-colors ${darkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-xl`}
              title={sidebarCollapsed ? 'Help Center' : ''}
            >
              <Info className={`w-4 h-4 ${!sidebarCollapsed ? 'mr-3' : ''}`} />
              {!sidebarCollapsed && 'Help Center'}
            </Button>
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2 text-sm font-medium transition-colors ${
                activeTab === 'account' 
                  ? `text-black bg-gray-100 rounded-xl font-semibold`
                  : `${darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'} rounded-xl`
              }`}
              title={sidebarCollapsed ? 'Settings' : ''}
            >
              <Settings className={`w-4 h-4 ${!sidebarCollapsed ? 'mr-3' : ''}`} />
              {!sidebarCollapsed && 'Settings'}
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
              {activeTab === 'dashboard' && (
                <span className="flex items-center">
                  Dashboard
                </span>
              )}
              {activeTab === 'chat' && (
                <span className="flex items-center">
                  Chat
                </span>
              )}
              {activeTab === 'planning' && (
                <span className="flex items-center">
                  Planning
                </span>
              )}
              {activeTab === 'documents' && (
                <span className="flex items-center">
                  Vault
                </span>
              )}
              {activeTab === 'estimation' && (
                <span className="flex items-center">
                  Estimation
                </span>
              )}
              {activeTab === 'communications' && (
                <span className="flex items-center">
                  History
                </span>
              )}
              {activeTab === 'team' && (
                <span className="flex items-center">
                  Team
                </span>
              )}
              {activeTab === 'account' && (
                <span className="flex items-center">
                  Settings
                </span>
              )}
            </h1>
          </div>
          <div className="flex items-center gap-6 ml-4">
            {/* Date - Fixed width container */}
            <div className={`text-sm w-52 flex-shrink-0 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {formatDate(currentTime)}
            </div>
            
            {/* Live Time - Fixed width container with icon */}
            <div className={`flex items-center space-x-2 text-sm w-32 flex-shrink-0 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <Clock className="w-4 h-4" />
              <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
            </div>
            
            {/* Traffic Status - Dynamic colored dot with custom tooltip */}
            <div className="flex items-center space-x-2 w-48 flex-shrink-0">
              <div className="flex items-center space-x-2 relative group">
                <div className={`w-2 h-2 ${getTrafficDotColor()} rounded-full`}></div>
                <span className={`text-sm font-medium whitespace-nowrap ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Traffic: <span className="font-semibold">{getTrafficText()}</span>
                </span>
                {/* Custom Tooltip - Light gray, more rounded, below */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 text-xs text-gray-800 bg-gray-200 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-md">
                  Real-time traffic overview on nearby roads
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-200 rotate-45 -mb-1"></div>
                </div>
              </div>
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
                      <h2 className="text-2xl font-bold font-plus-jakarta text-gray-900">Good afternoon {userProfile.fullName}</h2>
                      <p className={`font-inter ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Here's what's happening today</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        onClick={() => setCurrentWeek(currentWeek - 1)}
                        className={`rounded-full ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-100'} border`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setCurrentWeek(currentWeek + 1)}
                        className={`rounded-full ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-100'} border`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* KPIs Grid with Week Info Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Week Info Box (first position) */}
                  <Card className={`hover:shadow-lg transition-shadow h-full ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <CardHeader className="pb-3">
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>This week</CardTitle>
                      <p className={`font-inter text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{getWeekLabel(currentWeek).date}</p>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-center">
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Efficiency {kpis[0].change.startsWith('+') ? 'increased' : 'decreased'} by <span className={`font-medium ${kpis[0].change.startsWith('+') ? 'text-success' : 'text-red-500'}`}>{kpis[0].change}</span> from last week
                      </p>
                    </CardContent>
                  </Card>

                  {/* KPI Cards (positions 2, 3, 4) */}
                  {kpis.map((kpi, index) => (
                    <Card key={index} className={`hover:shadow-lg transition-shadow h-full ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {kpi.title}
                        </CardTitle>
                        <kpi.icon className={`w-4 h-4 ${kpi.color === 'text-black' ? '' : kpi.color}`} style={kpi.color === 'text-black' ? { color: '#000000' } : {}} />
                      </CardHeader>
                      <CardContent>
                        <div className={`text-2xl font-bold font-space-grotesk mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {kpi.value}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {kpi.change.startsWith('+') ? (
                              <>
                                <span className="text-emerald-600 font-medium">↑</span>
                                <p className="text-xs text-emerald-600 font-medium">{kpi.change.replace('+', '')}</p>
                              </>
                            ) : (
                              <>
                                <span className="text-red-500 font-medium">↓</span>
                                <p className="text-xs text-red-500 font-medium">{kpi.change.replace('-', '')}</p>
                              </>
                            )}
                          </div>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>vs {kpi.previousValue}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Dashboard Bottom Section - Appointments and Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={`hover:shadow-lg transition-shadow ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Upcoming Appointments</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setActiveTab('planning')
                          setShowNewEventDialog(true)
                        }}
                        className={`text-sm px-3 py-1 h-auto transition-all duration-200 rounded-none hover:rounded-xl ${darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
                      >
                        + Add
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {getCurrentWeekEvents().slice(0, 3).map(event => (
                          <div key={event.id} className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <Calendar className="w-5 h-5" style={{ color: '#000000' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {event.title}
                              </p>
                              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'} font-light`}>
                                {event.client} • {event.time}
                              </p>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`text-xs px-1.5 py-0 rounded-full border ${getTypeColor(event.type)}`}
                            >
                              {event.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <Card className={`hover:shadow-lg transition-shadow ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader>
                        <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentActivities.slice(-3).reverse().map(activity => (
                            <div key={activity.id} className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                {activity.type === 'sms' && <Smartphone className="w-5 h-5" style={{ color: '#000000' }} />}
                                {activity.type === 'email' && <Mail className="w-5 h-5" style={{ color: '#000000' }} />}
                                {activity.type === 'call' && <PhoneCall className="w-5 h-5" style={{ color: '#000000' }} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {activity.contact}
                                </p>
                                <p className={`text-xs truncate ${darkMode ? 'text-gray-500' : 'text-gray-400'} font-light`}>
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

                    <Card className={`hover:shadow-lg transition-shadow ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader>
                        <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
                          <Lightbulb className="w-5 h-5 mr-2" style={{ color: '#000000' }} />
                          Today's AI Suggestions
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
                                {item.icon} {item.text}
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
                    Settings
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
                            <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userProfile.fullName}</h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Real Estate Agent</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                            <Input 
                              value={userProfile.fullName} 
                              onChange={(e) => setUserProfile({...userProfile, fullName: e.target.value})}
                              className="rounded-xl" 
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                            <Input 
                              value={userProfile.email} 
                              onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                              className="rounded-xl" 
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
                            <Input defaultValue="+1 (555) 123-4567" className="rounded-xl" />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Agency</label>
                            <Input 
                              value={userProfile.company} 
                              onChange={(e) => setUserProfile({...userProfile, company: e.target.value})}
                              className="rounded-xl" 
                            />
                          </div>
                        </div>
                        
                        <Button className="text-white rounded-full" style={{ backgroundColor: '#000000' }}>
                          <Save className="w-4 h-4 mr-2" />
                          Update Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Statistics */}
                  <Card className={`hover:shadow-lg transition-shadow ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <CardHeader>
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" style={{ color: '#000000' }} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Hours Saved</span>
                          </div>
                          <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>847h</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" style={{ color: '#000000' }} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Files Processed</span>
                          </div>
                          <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>1,234</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" style={{ color: '#000000' }} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Appointments</span>
                          </div>
                          <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>456</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Send className="w-4 h-4" style={{ color: '#000000' }} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Messages Sent</span>
                          </div>
                          <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>3,789</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Theme Settings */}
                <Card className={`mt-6 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                  <CardHeader>
                    <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Theme Settings</CardTitle>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Choose your preferred theme</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant={!darkMode ? "default" : "outline"}
                          onClick={() => setDarkMode(false)}
                          className={`rounded-full ${!darkMode ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                        >
                          <Sun className="w-4 h-4 mr-2" />
                          Light Theme
                        </Button>
                        <Button
                          variant={darkMode ? "default" : "outline"}
                          onClick={() => setDarkMode(true)}
                          className={`rounded-full ${darkMode ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                        >
                          <Moon className="w-4 h-4 mr-2" />
                          Dark Theme
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          )}

          {/* Chat */}
          {activeTab === 'chat' && (
            <div className="h-full flex">
              {/* Sidebar des conversations */}
              <div className={`w-80 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border-r flex flex-col`}>
                {/* Header avec bouton New Chat */}
                <div className="p-4">
                  <Button 
                    className={`w-full rounded-xl hover:shadow-lg transition-shadow ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-100 text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
                    onClick={() => {
                      // Create new chat in current file
                      handleChatReset();
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Chat
                  </Button>
                </div>

                {/* Sélecteur de dossier Vault */}
                <div className="p-4">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Vault Files
                  </label>
                  <Select value={currentBaseFile} onValueChange={(newBaseFile) => {
                    setCurrentBaseFile(newBaseFile)
                    
                    // Find the most recent chat for this base file
                    const chatsForBaseFile = Object.keys(messages).filter(chatId => 
                      chatId === newBaseFile || chatId.startsWith(`${newBaseFile}_`)
                    )
                    
                    if (chatsForBaseFile.length > 0) {
                      // Select the most recent chat (highest timestamp)
                      const latestChat = chatsForBaseFile.sort().pop()
                      setSelectedClient(latestChat)
                    } else {
                      // No chats for this base file, select the base file itself
                      setSelectedClient(newBaseFile)
                    }
                  }}>
                    <SelectTrigger className={`w-full rounded-xl ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-200 text-gray-900'}`}>
                      <SelectValue placeholder="General">
                        <div className="flex items-center">
                          <FolderOpen className="w-4 h-4 mr-2" />
                          {clients.find(c => c.id === currentBaseFile)?.name || "General"}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className={`rounded-xl ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
                      {clients.map(client => (
                        <SelectItem 
                          key={client.id} 
                          value={client.id} 
                          className={`transition-colors rounded-lg hover:rounded-xl ${darkMode ? 'text-gray-100 hover:!bg-gray-700' : 'text-gray-900 hover:!bg-gray-100'}`}
                        >
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Liste des conversations récentes */}
                <div className="flex-1 overflow-hidden p-4">
                  <div className="h-full flex flex-col">
                    <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                      Recent Chats
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2" style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: darkMode ? 'rgba(107, 114, 128, 0.6) transparent' : 'rgba(156, 163, 175, 0.6) transparent'
                    }}>
                      {Object.keys(messages).filter(chatId => 
                        chatId === currentBaseFile || chatId.startsWith(`${currentBaseFile}_`)
                      ).sort((a, b) => {
                        // Sort by last message timestamp (newest first)
                        const lastMessageA = messages[a]?.slice(-1)[0]?.timestamp || new Date(0)
                        const lastMessageB = messages[b]?.slice(-1)[0]?.timestamp || new Date(0)
                        
                        return new Date(lastMessageB) - new Date(lastMessageA)
                      }).map(chatId => {
                        const lastMessage = messages[chatId]?.slice(-1)[0];
                        if (!lastMessage) return null;
                        
                        return (
                          <div
                            key={chatId}
                            onClick={() => setSelectedClient(chatId)}
                            className={`p-3 rounded-xl cursor-pointer transition-colors ${
                              selectedClient === chatId 
                                ? `${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} border rounded-xl`
                                : `${darkMode ? 'hover:bg-gray-800 hover:rounded-xl' : 'hover:bg-white hover:rounded-xl'}`
                            }`}
                          >
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} line-clamp-2`}>
                              {lastMessage.content.substring(0, 50)}...
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Zone de chat principale */}
              <div className="flex-1 flex flex-col relative">
                {/* Boutons flottants en haut à droite avec fond moderne */}
                <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
                  <div className={`flex items-center space-x-2 px-3 py-2 rounded-full backdrop-blur-md border shadow-lg ${darkMode ? 'bg-gray-900/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'}`}>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setShowChatDeleteConfirm(true)}
                      className={`rounded-full p-2 text-red-500 hover:text-red-600 ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100/50'}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setShowAIHelp(true)}
                      className={`rounded-full p-2 text-black hover:text-gray-800 ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100/50'}`}
                    >
                      <Lightbulb className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: darkMode ? '#1a1a1a' : '#f9f9f9' }}>
                  <div className="max-w-4xl mx-auto">
                    <div className="space-y-6">
                      {getCurrentMessages().map(message => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.role === 'assistant' ? (
                            // Messages IA avec effet hover
                            <div className="group max-w-2xl">
                              <div className="flex items-start">
                                <div className="px-4 py-3 rounded-2xl">
                                  <p className={`text-sm whitespace-pre-wrap leading-relaxed ${darkMode ? 'text-white' : 'text-gray-900'}`}>{message.content}</p>
                                </div>
                              </div>
                              {/* Heure et bouton copy - apparaissent au hover avec fondu */}
                              <div className="flex items-center justify-between mt-1 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <button 
                                  onClick={() => navigator.clipboard.writeText(message.content)}
                                  className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full transition-colors ${
                                    darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                  }`}
                                >
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            // Messages utilisateur avec effet hover
                            <div className="group max-w-2xl">
                              <div className="flex items-start justify-end">
                                <div className={`px-4 py-3 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                  <p className={`text-sm whitespace-pre-wrap leading-relaxed ${darkMode ? 'text-white' : 'text-gray-900'}`}>{message.content}</p>
                                </div>
                              </div>
                              {/* Heure et bouton copy - apparaissent au hover avec fondu */}
                              <div className="flex items-center justify-between mt-1 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <button 
                                  onClick={() => navigator.clipboard.writeText(message.content)}
                                  className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full transition-colors ${
                                    darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                  }`}
                                >
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-start max-w-2xl">
                            <div className="px-4 py-3 rounded-2xl">
                              <div className="flex items-center space-x-2">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#000000' }}></div>
                                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#000000', animationDelay: '0.1s' }}></div>
                                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#000000', animationDelay: '0.2s' }}></div>
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
                
                {/* Zone de saisie */}
                <div className={`border-t border-gray-300 p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-end space-x-3">
                      <div className="flex-1">
                        <div className={`flex items-center space-x-2 p-2 rounded-3xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} shadow-sm`}>
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
                            placeholder="Message Marwyck..."
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
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim()}
                        className="text-white p-3 rounded-full shadow-md hover:shadow-lg transition-all"
                        style={{ backgroundColor: inputMessage.trim() ? '#000000' : '#666666' }}
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
            <div className="p-6 h-full overflow-y-auto" style={{
              scrollbarWidth: 'auto',
              scrollbarColor: darkMode ? 'rgba(107, 114, 128, 0.6) transparent' : 'rgba(156, 163, 175, 0.6) transparent'
            }}>
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className={`text-2xl font-bold font-plus-jakarta ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        File Management
                      </h2>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your files and documents</p>
                    </div>
                    <Button
                      onClick={() => addNewDossier()}
                      className="group relative overflow-hidden bg-black text-white hover:bg-gray-800 transition-all duration-200 rounded-2xl px-8 py-3 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200" />
                        </div>
                        <span className="text-sm font-semibold">New File</span>
                      </div>
                      {/* Subtle gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {dossiersList.map(dossier => (
                    <div 
                      key={dossier.id} 
                      onClick={() => openFileDetails(dossier)}
                      className={`bg-white rounded-xl border border-gray-200 p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1 hover:border-gray-300 h-48 flex flex-col`}
                    >
                      {/* Header avec titre et type */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 leading-tight">
                            {dossier.title || dossier.address}
                          </h3>
                          <p className="text-gray-500 text-sm mt-2">
                            {dossier.address}
                          </p>
                        </div>
                        <div>
                          {dossier.type ? (
                            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                              {dossier.type}
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-dashed border-gray-300">
                              Select type
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Spacer pour pousser le contenu vers le bas */}
                      <div className="flex-1"></div>

                      {/* Nombre de fichiers et boutons d'action */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-red-500 hover:bg-red-50 rounded-full p-2"
                            onClick={(e) => deleteDossier(dossier.id, e)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-black hover:bg-gray-100 rounded-full p-2"
                            onClick={(e) => shareDossier(dossier.id, e)}
                          >
                            <UserPlus className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="text-xs text-gray-400">
                          {dossier.documents?.length || 0} Files Inside
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Planning */}
          {activeTab === 'planning' && (
            <div className="h-full flex p-6">
              <div className="flex-1 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className={`text-2xl font-bold font-plus-jakarta ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Planning
                      </h2>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your appointments and schedule</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentWeek(currentWeek - 1)}
                        className={`rounded-xl ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentWeek(0)}
                        disabled={currentWeek === 0}
                        className={`rounded-xl px-4 ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50' : 'border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50'}`}
                      >
                        Today
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentWeek(currentWeek + 1)}
                        className={`rounded-xl ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Calendar Grid Container - Box avec bords arrondis */}
                <div className={`h-[calc(100vh-240px)] flex flex-col rounded-xl shadow-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                  {/* Day Headers */}
                  <div className={`flex border-b shadow-sm rounded-t-xl ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    <div className={`w-20 flex flex-col items-center justify-between py-4 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div></div>
                      <span className={`text-xs font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        GMT{new Date().getTimezoneOffset() <= 0 ? '+' : '-'}{Math.abs(Math.floor(new Date().getTimezoneOffset() / 60)).toString().padStart(2, '0')}
                      </span>
                    </div>
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, index) => {
                      const weekDates = getCurrentWeekDates()
                      const dayDate = weekDates[index === 0 ? 6 : index - 1]
                      const isToday = dayDate.toDateString() === new Date().toDateString()
                      const dateString = `${(dayDate.getMonth() + 1).toString().padStart(2, '0')}/${dayDate.getDate().toString().padStart(2, '0')}`
                      
                      return (
                        <div key={day} className={`flex-1 text-center py-4 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} last:border-r-0`}>
                          <div className={`text-xs font-bold mb-2 uppercase tracking-wide ${isToday ? 'text-black' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {day}
                          </div>
                          {isToday ? (
                            <div className="flex justify-center">
                              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
                                <span className="text-sm font-bold">{dayDate.getDate()}</span>
                              </div>
                            </div>
                          ) : (
                            <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {dateString}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Time Grid - 24 hours */}
                  <div className="flex-1 overflow-y-auto rounded-b-xl" style={{ maxHeight: 'calc(100vh - 320px)' }}>
                    <div className="flex">
                      {/* Time Column */}
                      <div className={`w-20 border-r-2 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-300'}`}>
                        {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                          <div key={hour} className={`h-12 flex items-center justify-center border-b text-xs font-medium ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                            {hour === 0 ? '12 AM' : 
                             hour === 12 ? '12 PM' : 
                             hour < 12 ? `${hour} AM` : 
                             `${hour - 12} PM`}
                          </div>
                        ))}
                      </div>
                      
                      {/* Days Columns */}
                      {[6, 0, 1, 2, 3, 4, 5].map((dayIndex, colIndex) => {
                        return (
                          <div key={dayIndex} className={`flex-1 min-w-0 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} border-r last:border-r-0`}>
                            {Array.from({ length: 24 }, (_, i) => i).map(hour => {
                              const currentWeekEvents = getCurrentWeekEvents();
                              const hasEvent = currentWeekEvents.find(event => 
                                event.dayOfWeek === dayIndex && parseInt(event.time.split(':')[0]) === hour
                              );
                              
                              return (
                                <div 
                                  key={`${dayIndex}-${hour}`} 
                                  className={`h-12 border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700/30' : 'border-gray-100 hover:bg-gray-50'} cursor-pointer relative transition-colors`}
                                  onClick={() => {
                                    const weekDates = getCurrentWeekDates();
                                    const slotDate = weekDates[dayIndex];
                                    const dateString = slotDate.toISOString().split('T')[0];
                                    const timeString = hour.toString().padStart(2, '0') + ':00';
                                    
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
                                      className="absolute inset-x-1 top-1 bottom-1 rounded-lg text-white text-xs px-2 flex items-center shadow-md transition-all hover:shadow-lg cursor-pointer"
                                      style={{ backgroundColor: '#000000' }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedEvent(hasEvent);
                                        setShowEventDetails(true);
                                      }}
                                    >
                                      <span className="truncate font-semibold text-xs leading-tight">{hasEvent.title}</span>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Sidebar */}
              <div className="w-80 p-6 overflow-y-auto">
                <Card className={`rounded-xl shadow-lg ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} mb-6`}>
                  <CardHeader className="pb-4">
                    <CardTitle className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button 
                        className="w-full text-white rounded-xl shadow-md hover:shadow-lg transition-all font-semibold" 
                        style={{ backgroundColor: '#000000' }}
                        onClick={() => setShowNewEventDialog(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        New Appointment
                      </Button>

                      <Button 
                        variant="outline" 
                        className={`w-full rounded-xl font-medium shadow-sm hover:shadow-md transition-all ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setShowProposeDialog(true)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Propose Slots
                      </Button>

                      <Button 
                        variant="outline" 
                        className={`w-full rounded-xl font-medium shadow-sm hover:shadow-md transition-all ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setShowRescheduleDialog(true)}
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Reschedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`rounded-xl shadow-lg ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'}`}>
                  <CardHeader className="pb-4">
                    <CardTitle className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Team Planning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {teamMembers.map(member => (
                        <div key={member.id} className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}>
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
                            className="w-4 h-4 rounded-full shadow-sm"
                            style={{ backgroundColor: member.color }}
                          ></div>
                          <label 
                            htmlFor={`team-${member.id}`}
                            className={`text-sm font-medium cursor-pointer flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
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
                      <Button className="w-full text-white rounded-full" style={{ backgroundColor: '#000000' }}>
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
                      <div className={`text-4xl font-bold font-space-grotesk mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ color: '#000000' }}>
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
                        <Button className="text-white rounded-full" style={{ backgroundColor: '#000000' }} onClick={() => setShowSendToClientDialog(true)}>
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
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track and review all communication activities</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  <Card className={`lg:col-span-3 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <CardHeader>
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Communications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="max-h-96 overflow-y-auto space-y-4 pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#9CA3AF transparent' }}>
                        {recentActivities.map((activity, index) => (
                          <div 
                            key={activity.id} 
                            className={`p-4 rounded-xl border cursor-pointer transition-colors ${darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'} ${selectedActivity?.id === activity.id ? (darkMode ? 'bg-gray-700 border-gray-500' : 'bg-gray-100 border-gray-400') : ''}`}
                            onClick={() => setSelectedActivity(activity)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                  {activity.type === 'sms' && <Smartphone className="w-5 h-5" style={{ color: '#000000' }} />}
                                  {activity.type === 'email' && <Mail className="w-5 h-5" style={{ color: '#000000' }} />}
                                  {activity.type === 'call' && <PhoneCall className="w-5 h-5" style={{ color: '#000000' }} />}
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
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.date}</p>
                                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{activity.time}</p>
                                <div className="flex items-center space-x-1 mt-1">
                                  {activity.status === 'sent' && <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>Sent</span>}
                                  {activity.status === 'delivered' && <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>Delivered</span>}
                                  {activity.status === 'completed' && <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>Completed</span>}
                                  {activity.status === 'pending' && <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`}>Pending</span>}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`lg:col-span-2 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <CardHeader>
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Activity Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedActivity ? (
                        <div className="space-y-4">
                          <div className="pb-3 border-b border-gray-200 dark:border-gray-700">
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {selectedActivity.date}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              {selectedActivity.time}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Summary</h4>
                            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {selectedActivity.message}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</h4>
                            <div className="flex items-center space-x-2">
                              {selectedActivity.status === 'sent' && (
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Message sent successfully</span>
                                </div>
                              )}
                              {selectedActivity.status === 'delivered' && (
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Successfully delivered</span>
                                </div>
                              )}
                              {selectedActivity.status === 'completed' && (
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Action completed</span>
                                </div>
                              )}
                              {selectedActivity.status === 'pending' && (
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                  <span className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Awaiting response</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {selectedActivity.type === 'call' && (
                            <div>
                              <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Call Details</h4>
                              <div className="space-y-1 text-sm">
                                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Duration: 5 mins 32 secs</p>
                                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Quality: Excellent</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <MessageCircle className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Select a communication from the history to view details
                          </p>
                        </div>
                      )}
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
                    className="group relative overflow-hidden bg-black text-white hover:bg-gray-800 transition-all duration-200 rounded-2xl px-8 py-3 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200" />
                      </div>
                      <span className="text-sm font-semibold">Add Member</span>
                    </div>
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {teamMembers.map(member => (
                    <Card key={member.id} className={`rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : ''} hover:shadow-lg transition-shadow`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {member.name}
                                </h3>
                                {member.status === 'active' ? (
                                  <span className="text-xs font-medium text-green-800 bg-green-100 px-2 py-1 rounded-full">
                                    Active
                                  </span>
                                ) : (
                                  <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                                    Last active {member.lastActiveTime}
                                  </span>
                                )}
                              </div>
                              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {member.role}
                              </p>
                            </div>
                          </div>
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
                        </div>

                        {/* Spacer pour pousser le contenu vers le bas */}
                        <div className="flex-1"></div>

                        {/* Boutons d'action comme dans Vault */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-500 hover:bg-red-50 rounded-full p-2"
                              onClick={() => handleRemoveTeamMember(member.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Team Member
                          </span>
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
              Edit File
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
              <div className="space-y-2 max-h-60 overflow-y-auto" style={{
                scrollbarWidth: 'auto',
                scrollbarColor: darkMode ? 'rgba(107, 114, 128, 0.6) transparent' : 'rgba(156, 163, 175, 0.6) transparent'
              }}>
                {editingDossier?.documents.map(doc => (
                  <div key={doc.id} className={`flex items-center justify-between p-3 border rounded-xl transition-all duration-200 ${getDocumentBoxColor(doc.status || 'none', darkMode)}`}>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(doc.status)}
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{doc.name}</span>
                    </div>
                    <Select value={doc.status} onValueChange={(value) => updateDocumentStatus(doc.id, value)}>
                      <SelectTrigger className={`w-32 rounded-full text-xs ${getStatusColor(doc.status || 'none')}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={`rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                        <SelectItem value="none" className={`transition-colors rounded-lg ${darkMode ? 'text-gray-100 hover:!bg-gray-600' : 'text-gray-900 hover:!bg-gray-100'}`}>None</SelectItem>
                        <SelectItem value="missing" className={`transition-colors rounded-lg ${darkMode ? 'text-gray-100 hover:!bg-gray-600' : 'text-gray-900 hover:!bg-gray-100'}`}>Missing</SelectItem>
                        <SelectItem value="pending" className={`transition-colors rounded-lg ${darkMode ? 'text-gray-100 hover:!bg-gray-600' : 'text-gray-900 hover:!bg-gray-100'}`}>Pending</SelectItem>
                        <SelectItem value="completed" className={`transition-colors rounded-lg ${darkMode ? 'text-gray-100 hover:!bg-gray-600' : 'text-gray-900 hover:!bg-gray-100'}`}>Completed</SelectItem>
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
                          onClick={() => removeEditingContact(index)}
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
                    className={`w-full rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-100'} border`}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contact
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEditDossier(false)} className={`rounded-full ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-100'} border`}>
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
      
      {/* Modal de confirmation de suppression */}
      <Dialog open={showChatDeleteConfirm} onOpenChange={setShowChatDeleteConfirm} modal={false}>
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <div className="space-y-4">
            <div className="text-center">
              <Trash2 className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Delete Chat
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Are you sure you want to delete this chat? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setShowChatDeleteConfirm(false)}
                className={`rounded-full px-6 ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDeleteChat}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de détails du fichier */}
      <Dialog open={showFileDetailsModal} onOpenChange={setShowFileDetailsModal} modal={false}>
        <DialogContent className={`max-w-7xl !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <div className="h-[85vh] flex gap-8">
            {/* Partie gauche - Informations modifiables */}
            <div className={`w-[55%] ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl`}>
              <div className="p-6 h-full flex flex-col">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    File Details
                  </h3>
                  <div className="flex items-center">
                    <Select value={selectedFileForDetails?.type || ''} onValueChange={changeFileDetailsType}>
                      <SelectTrigger className="w-32 rounded-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Sale" className="rounded-lg">Sale</SelectItem>
                        <SelectItem value="Purchase" className="rounded-lg">Purchase</SelectItem>
                        <SelectItem value="Rental" className="rounded-lg">Rental</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {selectedFileForDetails && (
                  <>
                    {/* Title et Contacts - fixes en haut */}
                    <div className="space-y-5 mb-5">
                      {/* Titre modifiable - reste fixe */}
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          Title
                        </label>
                        <input
                          type="text"
                          value={fileTitle}
                          onChange={(e) => {
                            setFileTitle(e.target.value)
                            saveFileDetailsChanges()
                          }}
                          placeholder={selectedFileForDetails?.address || ''}
                          className={`w-full px-3 py-2 rounded-full border-2 focus:outline-none focus:border-black transition-colors text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-gray-400' : 'bg-white border-gray-200 text-gray-900'}`}
                        />
                      </div>

                      {/* Adresse modifiable */}
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          Address
                        </label>
                        <input
                          type="text"
                          value={fileAddress}
                          onChange={(e) => {
                            setFileAddress(e.target.value)
                            saveFileDetailsChanges()
                          }}
                          className={`w-full px-3 py-2 rounded-full border-2 focus:outline-none focus:border-black transition-colors text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-gray-400' : 'bg-white border-gray-200 text-gray-900'}`}
                        />
                      </div>

                      {/* Contacts - avec largeur contrôlée */}
                      <div>
                        <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          Contacts
                        </label>
                        <div className="space-y-2 w-full">
                          {/* Contact 1 */}
                          <div className="flex items-center space-x-2 w-full">
                            <input
                              type="text"
                              placeholder="Name"
                              value={fileContacts[0]?.name || ''}
                              onChange={(e) => {
                                const newContacts = [...fileContacts]
                                newContacts[0] = { ...newContacts[0], name: e.target.value }
                                setFileContacts(newContacts)
                                saveFileDetailsChanges()
                              }}
                              className={`w-1/3 px-2 py-2 text-sm rounded-full border focus:outline-none focus:border-black transition-colors ${darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                            />
                            <input
                              type="email"
                              placeholder="Email"
                              value={fileContacts[0]?.email || ''}
                              onChange={(e) => {
                                const newContacts = [...fileContacts]
                                newContacts[0] = { ...newContacts[0], email: e.target.value }
                                setFileContacts(newContacts)
                                saveFileDetailsChanges()
                              }}
                              className={`w-1/3 px-2 py-2 text-sm rounded-full border focus:outline-none focus:border-black transition-colors ${darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                            />
                            <input
                              type="tel"
                              placeholder="Phone"
                              value={fileContacts[0]?.phone || ''}
                              onChange={(e) => {
                                const newContacts = [...fileContacts]
                                newContacts[0] = { ...newContacts[0], phone: e.target.value }
                                setFileContacts(newContacts)
                                saveFileDetailsChanges()
                              }}
                              className={`w-1/3 px-2 py-2 text-sm rounded-full border focus:outline-none focus:border-black transition-colors ${darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                            />
                          </div>
                          {/* Contact 2 */}
                          <div className="flex items-center space-x-2 w-full">
                            <input
                              type="text"
                              placeholder="Name"
                              value={fileContacts[1]?.name || ''}
                              onChange={(e) => {
                                const newContacts = [...fileContacts]
                                newContacts[1] = { ...newContacts[1], name: e.target.value }
                                setFileContacts(newContacts)
                                saveFileDetailsChanges()
                              }}
                              className={`w-1/3 px-2 py-2 text-sm rounded-full border focus:outline-none focus:border-black transition-colors ${darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                            />
                            <input
                              type="email"
                              placeholder="Email"
                              value={fileContacts[1]?.email || ''}
                              onChange={(e) => {
                                const newContacts = [...fileContacts]
                                newContacts[1] = { ...newContacts[1], email: e.target.value }
                                setFileContacts(newContacts)
                                saveFileDetailsChanges()
                              }}
                              className={`w-1/3 px-2 py-2 text-sm rounded-full border focus:outline-none focus:border-black transition-colors ${darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                            />
                            <input
                              type="tel"
                              placeholder="Phone"
                              value={fileContacts[1]?.phone || ''}
                              onChange={(e) => {
                                const newContacts = [...fileContacts]
                                newContacts[1] = { ...newContacts[1], phone: e.target.value }
                                setFileContacts(newContacts)
                                saveFileDetailsChanges()
                              }}
                              className={`w-1/3 px-2 py-2 text-sm rounded-full border focus:outline-none focus:border-black transition-colors ${darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Required Documents - agrandissement très léger */}
                    <div className="flex-1 mb-6">
                      <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Required Documents
                      </label>
                      <div className="max-h-52 overflow-y-auto space-y-2 pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#9CA3AF transparent' }}>
                        {selectedFileForDetails.documents?.map(doc => (
                          <div key={doc.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${getDocumentBoxColor(doc.status || 'none', darkMode)}`}>
                            <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                              {doc.name}
                            </span>
                            <Select value={doc.status || 'none'} onValueChange={(value) => updateFileDetailsDocumentStatus(doc.id, value)}>
                              <SelectTrigger className={`w-28 rounded-full text-xs ${getStatusColor(doc.status || 'none')}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectItem value="none" className="rounded-lg">None</SelectItem>
                                <SelectItem value="missing" className="rounded-lg">Missing</SelectItem>
                                <SelectItem value="pending" className="rounded-lg">Pending</SelectItem>
                                <SelectItem value="completed" className="rounded-lg">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Boutons Save et Cancel */}
                    <div className="p-4 text-center">
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => setShowFileDetailsModal(false)}
                          variant="outline"
                          className="flex-1 border-gray-300 hover:bg-gray-50 rounded-full px-4 py-1.5"
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={saveFileDetails}
                          className="flex-1 bg-black text-white hover:bg-gray-800 rounded-full px-4 py-1.5"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Partie droite - Fichiers importés */}
            <div className={`w-[45%] ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-xl p-6 border flex flex-col`}>
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Imported Files
              </h3>
              
              {/* Liste des fichiers importés */}
              <div className="flex-1 mb-6 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                <div className="space-y-3">
                  <div className={`p-4 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} flex items-center justify-between hover:border-gray-400 transition-colors`}>
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-red-600 rounded-lg" />
                      <div>
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          sample-document.pdf
                        </span>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          245 KB • PDF
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="text-blue-500 hover:bg-blue-50 rounded-full p-2">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-green-500 hover:bg-green-50 rounded-full p-2">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50 rounded-full p-2">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} flex items-center justify-between hover:border-gray-400 transition-colors`}>
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-blue-600 rounded-lg" />
                      <div>
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          contract.docx
                        </span>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          128 KB • Word
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="text-blue-500 hover:bg-blue-50 rounded-full p-2">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-green-500 hover:bg-green-50 rounded-full p-2">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50 rounded-full p-2">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zone de drag & drop - icône sans fond */}
              <div className={`border-2 border-dashed ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-100'} rounded-xl p-3 text-center hover:border-black transition-colors`}>
                <div className="flex items-center justify-center mx-auto mb-2">
                  <Upload className="w-8 h-8 text-gray-600" />
                </div>
                <h4 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Drop files here
                </h4>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                  Drag and drop files here, or click to browse
                </p>
                <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-4 py-1.5">
                  Browse Files
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de partage avec l'équipe */}
      <Dialog open={showShareFileModal} onOpenChange={setShowShareFileModal} modal={false}>
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <DialogHeader>
            <DialogTitle className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Share this file with team?
            </DialogTitle>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Select team members to share <strong>{selectedFileForShare?.title || selectedFileForShare?.address}</strong> with.
            </p>
          </DialogHeader>
          <div className="mt-4">
            <div className="max-h-48 overflow-y-auto space-y-3 pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#9CA3AF transparent' }}>
              {teamMembers.map(member => (
                <label key={member.id} className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer hover:bg-gray-50 ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200'}`}>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <div className="flex-1">
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {member.name}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {member.role}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setShowShareFileModal(false)}
              className={`flex-1 rounded-full ${darkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300'}`}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setShowShareFileModal(false)}
              className="flex-1 text-white rounded-full" 
              style={{ backgroundColor: '#000000' }}
            >
              Share
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmation de suppression */}
      <Dialog open={showDeleteFileConfirm} onOpenChange={setShowDeleteFileConfirm} modal={false}>
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <div className="space-y-4">
            <div className="text-center">
              <Trash2 className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Delete File
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Are you sure you want to delete <strong>{selectedFileForDelete?.title || selectedFileForDelete?.address}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteFileConfirm(false)}
                className={`rounded-full px-6 ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmDeleteDossier}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Modal de confirmation de suppression de membre d'équipe */}
      <Dialog open={showDeleteMemberConfirm} onOpenChange={setShowDeleteMemberConfirm} modal={false}>
        <DialogContent className={`sm:max-w-md !rounded-2xl shadow-xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} [&>button]:hidden`} style={{ borderRadius: '1rem' }}>
          <div className="space-y-4">
            <div className="text-center">
              <Trash2 className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Delete Team Member
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Are you sure you want to remove <strong>{selectedMemberForDelete?.name}</strong> from the team? All shared files with this member will be cancelled. This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteMemberConfirm(false)}
                className={`rounded-full px-6 ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmDeleteMember}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}