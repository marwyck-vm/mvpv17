'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
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
  MoreHorizontal
} from 'lucide-react'

export default function MarwyckCopilot() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [activeDossier, setActiveDossier] = useState('123 Oak Street')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(0)
  const [selectedClient, setSelectedClient] = useState('all')
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Bonjour ! Je suis Marwyck, votre assistant IA. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(Date.now() - 3600000)
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [trafficStatus, setTrafficStatus] = useState('good')
  const [darkMode, setDarkMode] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef(null)

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
      case 'good': return 'Fluide'
      case 'medium': return 'Modéré'
      case 'heavy': return 'Saturé'
      default: return 'Inconnu'
    }
  }

  // Mock data
  const dossiers = [
    { id: 1, address: '123 Oak Street', type: 'Vente', status: 'active', priority: 'high' },
    { id: 2, address: '456 Pine Avenue', type: 'Achat', status: 'pending', priority: 'medium' },
    { id: 3, address: '789 Elm Drive', type: 'Location', status: 'completed', priority: 'low' }
  ]

  const clients = [
    { id: 'all', name: 'Tous les clients' },
    { id: 'john-smith', name: 'John Smith' },
    { id: 'marie-durant', name: 'Marie Durant' },
    { id: 'paul-martin', name: 'Paul Martin' }
  ]

  const quickActions = [
    { id: 'new-contact', name: 'Nouveau Contact', icon: User },
    { id: 'schedule-visit', name: 'Planifier Visite', icon: Calendar },
    { id: 'send-estimate', name: 'Envoyer Estimation', icon: Calculator },
    { id: 'follow-up', name: 'Relance Client', icon: Phone }
  ]

  const getWeekLabel = (weekOffset) => {
    const dates = ['12-18 Jan', '19-25 Jan', '26-01 Fév']
    const labels = ['Semaine précédente', 'Cette semaine', 'Semaine suivante']
    return { date: dates[weekOffset + 1], label: labels[weekOffset + 1] }
  }

  const kpis = [
    { 
      title: 'Heures Gagnées', 
      value: '32.5', 
      previousValue: '28.5',
      change: '+14%', 
      icon: Clock, 
      color: 'text-success',
      trend: 'up'
    },
    { 
      title: 'Relances Envoyées', 
      value: '156', 
      previousValue: '142',
      change: '+10%', 
      icon: Send, 
      color: 'text-accent-cyan',
      trend: 'up'
    },
    { 
      title: 'Docs Complétés', 
      value: '92%', 
      previousValue: '89%',
      change: '+3%', 
      icon: FileText, 
      color: 'text-success',
      trend: 'up'
    },
    { 
      title: 'RDV Planifiés', 
      value: '28', 
      previousValue: '24',
      change: '+17%', 
      icon: Calendar, 
      color: 'text-accent-cyan',
      trend: 'up'
    }
  ]

  const recentActivities = [
    { id: 1, type: 'sms', contact: 'John Smith', message: 'Rappel visite demain 14h', time: '10:30', status: 'sent' },
    { id: 2, type: 'email', contact: 'Marie Durant', message: 'Documents signés reçus', time: '09:15', status: 'delivered' },
    { id: 3, type: 'call', contact: 'Paul Martin', message: 'Appel de suivi effectué', time: '08:45', status: 'completed' }
  ]

  const documentsTemplates = {
    vente: [
      { name: 'Compromis de vente', required: true },
      { name: 'Diagnostics techniques', required: true },
      { name: 'Attestation assurance', required: true },
      { name: 'Certificat énergétique', required: false },
      { name: 'Procuration', required: false }
    ],
    achat: [
      { name: 'Offre d\'achat', required: true },
      { name: 'Justificatifs revenus', required: true },
      { name: 'Attestation financement', required: true },
      { name: 'Pièce d\'identité', required: true }
    ],
    location: [
      { name: 'Bail de location', required: true },
      { name: 'État des lieux', required: true },
      { name: 'Dossier locataire', required: true },
      { name: 'Assurance habitation', required: true }
    ]
  }

  const [dossiersList, setDossiersList] = useState([
    { 
      id: 1, 
      address: '123 Oak Street', 
      type: 'vente', 
      status: 'active', 
      priority: 'high',
      documents: [
        { id: 1, name: 'Compromis de vente', type: 'PDF', status: 'signed', required: true },
        { id: 2, name: 'Diagnostics techniques', type: 'PDF', status: 'received', required: true },
        { id: 3, name: 'Attestation assurance', type: 'PDF', status: 'missing', required: true }
      ]
    },
    { 
      id: 2, 
      address: '456 Pine Avenue', 
      type: 'achat', 
      status: 'pending', 
      priority: 'medium',
      documents: [
        { id: 4, name: 'Offre d\'achat', type: 'PDF', status: 'received', required: true },
        { id: 5, name: 'Justificatifs revenus', type: 'PDF', status: 'missing', required: true }
      ]
    }
  ])

  const calendarEvents = [
    { id: 1, title: 'Visite 123 Oak Street', time: '14:00', type: 'visit', client: 'John Smith' },
    { id: 2, title: 'Signature chez notaire', time: '16:30', type: 'signature', client: 'Marie Durant' },
    { id: 3, title: 'Estimation 456 Pine Ave', time: '10:00', type: 'estimation', client: 'Paul Martin' }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage)
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('/relance') || lowerMessage.includes('relance')) {
      return "✅ Relance programmée !\n\n📧 Email envoyé à John Smith\n📱 SMS programmé pour demain 9h\n📞 Appel de suivi planifié\n\nSouhaitez-vous voir le détail des relances ?"
    }
    
    if (lowerMessage.includes('/estimation') || lowerMessage.includes('estimation')) {
      return "🏠 Estimation générée pour 123 Oak Street !\n\n💰 Fourchette: $420,000 - $450,000\n📊 Basé sur 8 comparables récents\n📄 Rapport PDF disponible\n\nVoulez-vous que j'envoie le rapport au client ?"
    }
    
    if (lowerMessage.includes('/rdv') || lowerMessage.includes('rendez-vous')) {
      return "📅 Créneaux disponibles trouvés !\n\n🕐 Demain 14h00 - 15h00\n🕑 Jeudi 10h30 - 11h30\n🕒 Vendredi 16h00 - 17h00\n\nQuel créneau confirmer ?"
    }
    
    if (lowerMessage.includes('/docs') || lowerMessage.includes('documents')) {
      return "📋 Statut des documents pour 123 Oak Street :\n\n✅ Compromis signé\n✅ Diagnostics reçus\n❌ Attestation assurance manquante\n⏳ Certificat énergétique en attente\n\nRelancer pour les pièces manquantes ?"
    }
    
    return "Je peux vous aider avec :\n\n📞 /relance - Programmer des relances\n🏠 /estimation - Estimer un bien\n📅 /rdv - Planifier un rendez-vous\n📋 /docs - Vérifier les documents\n\nQue souhaitez-vous faire ?"
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
      address: 'Nouvelle adresse',
      type: type,
      status: 'active',
      priority: 'medium',
      documents: documentsTemplates[type].map((doc, index) => ({
        id: Date.now() + index,
        name: doc.name,
        type: 'PDF',
        status: 'missing',
        required: doc.required
      }))
    }
    setDossiersList(prev => [...prev, newDossier])
  }

  const getSuggestedActions = (dossier) => {
    const missingDocs = dossier.documents.filter(doc => doc.status === 'missing')
    const actions = []
    
    if (missingDocs.length > 0) {
      actions.push(`Relancer pour ${missingDocs.length} document(s) manquant(s)`)
    }
    
    if (dossier.type === 'vente') {
      actions.push('Programmer visite')
      actions.push('Envoyer estimation')
    } else if (dossier.type === 'achat') {
      actions.push('Vérifier financement')
      actions.push('Planifier négociation')
    } else if (dossier.type === 'location') {
      actions.push('Vérifier dossier locataire')
      actions.push('Programmer état des lieux')
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
      // Simulate transcription
      setTimeout(() => {
        setInputMessage('Transcription: Bonjour, je souhaite programmer une visite pour demain.')
        setIsRecording(false)
      }, 3000)
    }
  }

  const handleQuickAction = (actionId) => {
    console.log('Quick action triggered:', actionId)
    // Handle quick actions
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div>
              <div className="text-xl font-bold gradient-logo font-plus-jakarta tracking-tight">
                MARWYCK
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2"
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
              { id: 'communications', label: 'SMS & Appels', icon: Phone }
            ].map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-accent-cyan text-white'
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                  }`}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {!sidebarCollapsed && item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-2 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="w-full justify-start px-3 py-2"
              title={sidebarCollapsed ? 'Toggle Theme' : ''}
            >
              {darkMode ? <Sun className="w-4 h-4 mr-3" /> : <Moon className="w-4 h-4 mr-3" />}
              {!sidebarCollapsed && (darkMode ? 'Mode Clair' : 'Mode Sombre')}
            </Button>
            <button
              className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
              title={sidebarCollapsed ? 'Dev Tools' : ''}
            >
              <Code className="w-4 h-4 mr-3" />
              {!sidebarCollapsed && 'Dev Tools'}
            </button>
            <button
              className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
              title={sidebarCollapsed ? 'Compte' : ''}
            >
              <User className="w-4 h-4 mr-3" />
              {!sidebarCollapsed && 'Compte'}
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
              {activeTab === 'communications' && 'SMS & Appels'}
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            {/* Live Time */}
            <div className={`flex items-center space-x-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <Clock className="w-4 h-4" />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
            
            {/* Traffic Status */}
            <div className="flex items-center space-x-2">
              <Navigation className={`w-4 h-4 ${getTrafficColor()}`} />
              <span className={`text-sm ${getTrafficColor()}`}>
                {getTrafficText()}
              </span>
            </div>

            {/* Quick Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="bg-accent-cyan hover:bg-accent-cyan-hover text-white rounded-full px-4">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {quickActions.map(action => (
                  <DropdownMenuItem key={action.id} onClick={() => handleQuickAction(action.id)}>
                    <action.icon className="w-4 h-4 mr-2" />
                    {action.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-8 h-8 rounded-full bg-accent-cyan flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
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
                        disabled={currentWeek <= -1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentWeek(currentWeek + 1)}
                        disabled={currentWeek >= 1}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Efficacité en hausse de <span className="font-medium text-success">+12%</span> par rapport à la semaine précédente
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
                        <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                      </CardHeader>
                      <CardContent>
                        <div className={`text-2xl font-bold font-space-grotesk mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {kpi.value}
                        </div>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-success">{kpi.change}</p>
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
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Activité récente</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map(activity => (
                          <div key={activity.id} className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {activity.type === 'sms' && <Smartphone className="w-5 h-5 text-accent-cyan" />}
                              {activity.type === 'email' && <Mail className="w-5 h-5 text-accent-cyan" />}
                              {activity.type === 'call' && <PhoneCall className="w-5 h-5 text-accent-cyan" />}
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
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Prochains RDV</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {calendarEvents.map(event => (
                          <div key={event.id} className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <Calendar className="w-5 h-5 text-accent-cyan" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {event.title}
                              </p>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {event.client} • {event.time}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Chat */}
          {activeTab === 'chat' && (
            <div className="h-full flex flex-col">
              <div className={`border-b p-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Choisir un client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map(client => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedClient !== 'all' && (
                    <Badge variant="outline" className="border-accent-cyan text-accent-cyan">
                      <FolderOpen className="w-3 h-3 mr-1" />
                      {clients.find(c => c.id === selectedClient)?.name}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-6">
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="flex items-start space-x-3 max-w-2xl">
                          {message.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-accent-cyan flex items-center justify-center flex-shrink-0">
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
                          <div className="w-8 h-8 rounded-full bg-accent-cyan flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <div className={`px-4 py-3 rounded-2xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Marwyck tape...</span>
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
                      <div className={`flex items-center space-x-2 p-3 rounded-2xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleFileUpload}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Tapez votre message..."
                          className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleVoiceTranscription}
                          className={`p-2 ${isRecording ? 'text-red-500' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                        >
                          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-accent-cyan hover:bg-accent-cyan-hover text-white p-3 rounded-full"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className={`mt-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Commandes disponibles: /relance, /estimation, /rdv, /docs
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
                        Gestion des Dossiers
                      </h2>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gérez vos dossiers et documents</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => addNewDossier('vente')}
                        size="sm"
                        className="bg-accent-cyan hover:bg-accent-cyan-hover text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Vente
                      </Button>
                      <Button
                        onClick={() => addNewDossier('achat')}
                        size="sm"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Achat
                      </Button>
                      <Button
                        onClick={() => addNewDossier('location')}
                        size="sm"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Location
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {dossiersList.map(dossier => (
                    <Card key={dossier.id} className={`hover:shadow-lg transition-shadow ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className={`text-lg font-semibold flex items-center space-x-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              <Building className="w-5 h-5 text-accent-cyan" />
                              <span>{dossier.address}</span>
                            </CardTitle>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {dossier.type}
                              </Badge>
                              <Badge 
                                variant={dossier.status === 'active' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {dossier.status}
                              </Badge>
                            </div>
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
                                    <Button size="sm" variant="outline" className="text-xs">
                                      Relancer
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className={`font-medium text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Actions suggérées</h4>
                            <div className="space-y-1">
                              {getSuggestedActions(dossier).map((action, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Target className="w-3 h-3 text-accent-cyan" />
                                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{action}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="pt-2 border-t">
                            <Button size="sm" className="w-full bg-accent-cyan hover:bg-accent-cyan-hover text-white">
                              Gérer le dossier
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
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className={`text-2xl font-bold font-plus-jakarta ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Planning - {getWeekLabel(currentWeek).label}
                      </h2>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{getWeekLabel(currentWeek).date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentWeek(currentWeek - 1)}
                        disabled={currentWeek <= -1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Précédente
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentWeek(0)}
                        disabled={currentWeek === 0}
                      >
                        Aujourd'hui
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentWeek(currentWeek + 1)}
                        disabled={currentWeek >= 1}
                      >
                        Suivante
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                      <CardHeader>
                        <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Calendrier de la semaine</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((day, index) => (
                            <div key={day} className={`border-b pb-4 ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                              <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{day}</h3>
                              <div className="space-y-2">
                                {index === 0 && (
                                  <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded p-3">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                          Visite 123 Oak Street
                                        </p>
                                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>14:00 - 15:00</p>
                                      </div>
                                      <Badge variant="outline" className="text-accent-cyan border-accent-cyan">
                                        Visite
                                      </Badge>
                                    </div>
                                  </div>
                                )}
                                {index === 1 && (
                                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-3">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                          Signature notaire
                                        </p>
                                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>16:30 - 17:30</p>
                                      </div>
                                      <Badge variant="outline" className="text-green-600 border-green-600">
                                        Signature
                                      </Badge>
                                    </div>
                                  </div>
                                )}
                                {index > 1 && (
                                  <p className={`text-sm italic ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Aucun rendez-vous</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                      <CardHeader>
                        <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Actions rapides</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Button className="w-full bg-accent-cyan hover:bg-accent-cyan-hover text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Nouveau RDV
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Calendar className="w-4 h-4 mr-2" />
                            Proposer créneaux
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Clock className="w-4 h-4 mr-2" />
                            Replanifier
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`mt-6 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                      <CardHeader>
                        <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Rappels</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                            <div>
                              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Visite demain</p>
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Préparer les clés</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                            <div>
                              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Rappel SMS</p>
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Envoyer rappel client</p>
                            </div>
                          </div>
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
                  <h2 className={`text-2xl font-bold font-plus-jakarta mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Estimation de Biens
                  </h2>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Obtenez des estimations rapides et précises</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                    <CardHeader>
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nouvelle Estimation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Adresse du bien
                          </label>
                          <Input placeholder="123 Oak Street, City, State" />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Type de bien
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir le type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="house">Maison</SelectItem>
                              <SelectItem value="apartment">Appartement</SelectItem>
                              <SelectItem value="condo">Condo</SelectItem>
                              <SelectItem value="land">Terrain</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Surface (m²)
                            </label>
                            <Input type="number" placeholder="150" />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Chambres
                            </label>
                            <Input type="number" placeholder="3" />
                          </div>
                        </div>
                        <Button className="w-full bg-accent-cyan hover:bg-accent-cyan-hover text-white">
                          <Calculator className="w-4 h-4 mr-2" />
                          Générer l'estimation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                    <CardHeader>
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Estimation Simulée</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Estimation pour</p>
                          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>123 Oak Street</h3>
                        </div>
                        
                        <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <div className="text-center">
                            <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fourchette d'estimation</p>
                            <div className="text-3xl font-bold font-space-grotesk text-accent-cyan">
                              $420,000 - $450,000
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Estimation moyenne</span>
                            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>$435,000</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Comparables utilisés</span>
                            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>8 propriétés</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Confiance</span>
                            <span className="font-medium text-success">85%</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Download className="w-4 h-4 mr-2" />
                              Rapport PDF
                            </Button>
                            <Button size="sm" className="flex-1 bg-accent-cyan hover:bg-accent-cyan-hover text-white">
                              <Send className="w-4 h-4 mr-2" />
                              Envoyer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className={`mt-6 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                  <CardHeader>
                    <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Estimations Récentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { address: '123 Oak Street', price: '$420,000 - $450,000', date: '2 jours' },
                        { address: '456 Pine Avenue', price: '$380,000 - $410,000', date: '1 semaine' },
                        { address: '789 Elm Drive', price: '$520,000 - $560,000', date: '2 semaines' }
                      ].map((estimation, index) => (
                        <div key={index} className={`flex items-center justify-between p-3 border rounded-lg ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                          <div>
                            <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{estimation.address}</p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Il y a {estimation.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-accent-cyan">{estimation.price}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Button size="sm" variant="outline">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
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
                  <h2 className={`text-2xl font-bold font-plus-jakarta mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    SMS & Appels
                  </h2>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Historique des communications</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                    <CardHeader>
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Messages récents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { type: 'sms', contact: 'John Smith', message: 'Rappel: Visite demain à 14h', time: '10:30', status: 'delivered' },
                          { type: 'email', contact: 'Marie Durant', message: 'Documents à signer envoyés', time: '09:15', status: 'opened' },
                          { type: 'sms', contact: 'Paul Martin', message: 'Estimation disponible', time: '08:45', status: 'sent' }
                        ].map((msg, index) => (
                          <div key={index} className={`flex items-start space-x-3 p-3 border rounded-lg ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                            <div className="flex-shrink-0">
                              {msg.type === 'sms' && <Smartphone className="w-5 h-5 text-accent-cyan" />}
                              {msg.type === 'email' && <Mail className="w-5 h-5 text-accent-cyan" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {msg.contact}
                                </p>
                                <div className="flex items-center space-x-2">
                                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{msg.time}</span>
                                  {getStatusIcon(msg.status)}
                                </div>
                              </div>
                              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{msg.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                    <CardHeader>
                      <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Appels récents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { contact: 'John Smith', duration: '3:45', time: '14:20', type: 'outbound', status: 'completed' },
                          { contact: 'Marie Durant', duration: '1:20', time: '11:30', type: 'inbound', status: 'completed' },
                          { contact: 'Paul Martin', duration: '0:00', time: '10:15', type: 'outbound', status: 'missed' }
                        ].map((call, index) => (
                          <div key={index} className={`flex items-center space-x-3 p-3 border rounded-lg ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                            <div className="flex-shrink-0">
                              <PhoneCall className={`w-5 h-5 ${call.type === 'outbound' ? 'text-accent-cyan' : 'text-green-500'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {call.contact}
                                </p>
                                <div className="flex items-center space-x-2">
                                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{call.time}</span>
                                  {getStatusIcon(call.status)}
                                </div>
                              </div>
                              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {call.type === 'outbound' ? 'Appel sortant' : 'Appel entrant'} • {call.duration}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}