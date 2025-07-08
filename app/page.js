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
  Calculator
} from 'lucide-react'

export default function MarwyckCopilot() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [activeDossier, setActiveDossier] = useState('123 Oak Street')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(0) // 0 = cette semaine, -1 = précédente, +1 = suivante
  const [selectedClient, setSelectedClient] = useState('all')
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Bonjour ! Je suis Marwyck, votre copilote IA. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(Date.now() - 3600000)
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Mock data
  const dossiers = [
    { id: 1, address: '123 Oak Street', type: 'Vente', status: 'active', priority: 'high' },
    { id: 2, address: '456 Pine Avenue', type: 'Achat', status: 'pending', priority: 'medium' },
    { id: 3, address: '789 Elm Drive', type: 'Vente', status: 'completed', priority: 'low' }
  ]

  const kpis = [
    { title: 'Heures Gagnées', value: '28.5', change: '+12%', icon: Clock, color: 'text-success' },
    { title: 'Relances Envoyées', value: '142', change: '+8%', icon: Send, color: 'text-accent-cyan' },
    { title: 'Docs Complétés', value: '89%', change: '+5%', icon: FileText, color: 'text-success' },
    { title: 'RDV Planifiés', value: '24', change: '+18%', icon: Calendar, color: 'text-accent-cyan' }
  ]

  const recentActivities = [
    { id: 1, type: 'sms', contact: 'John Smith', message: 'Rappel visite demain 14h', time: '10:30', status: 'sent' },
    { id: 2, type: 'email', contact: 'Marie Durant', message: 'Documents signés reçus', time: '09:15', status: 'delivered' },
    { id: 3, type: 'call', contact: 'Paul Martin', message: 'Appel de suivi effectué', time: '08:45', status: 'completed' }
  ]

  const documents = [
    { id: 1, name: 'Compromis de vente', type: 'PDF', status: 'signed', required: true },
    { id: 2, name: 'Diagnostics techniques', type: 'PDF', status: 'received', required: true },
    { id: 3, name: 'Attestation assurance', type: 'PDF', status: 'missing', required: true },
    { id: 4, name: 'Certificat énergétique', type: 'PDF', status: 'pending', required: false }
  ]

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

    // Simulate AI response
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="text-2xl font-bold gradient-logo font-plus-jakarta tracking-tight">
            MARWYCK
          </div>
          <p className="text-sm text-gray-600 mt-1">Copilote IA</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'chat', label: 'Chat', icon: MessageCircle },
              { id: 'planning', label: 'Planning', icon: Calendar },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'communications', label: 'SMS & Appels', icon: Phone }
            ].map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-accent-cyan text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-accent-cyan text-accent-cyan">
              📂 {activeDossier}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button size="sm" className="bg-accent-cyan hover:bg-accent-cyan-hover text-white">
              <Plus className="w-4 h-4 mr-2" />
              Action rapide
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 font-plus-jakarta mb-2">
                    Dashboard
                  </h1>
                  <p className="text-gray-600">Vue d'ensemble de votre activité</p>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {kpis.map((kpi, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                          {kpi.title}
                        </CardTitle>
                        <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold font-space-grotesk mb-1">
                          {kpi.value}
                        </div>
                        <p className="text-xs text-success">{kpi.change}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Activité récente</CardTitle>
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
                              <p className="text-sm font-medium text-gray-900">
                                {activity.contact}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {activity.message}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">{activity.time}</span>
                              {getStatusIcon(activity.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Prochains RDV</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {calendarEvents.map(event => (
                          <div key={event.id} className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <Calendar className="w-5 h-5 text-accent-cyan" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {event.title}
                              </p>
                              <p className="text-sm text-gray-500">
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
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-4">
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-gray-100 text-gray-900'
                              : 'bg-white border border-accent-cyan text-gray-900'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-accent-cyan px-4 py-2 rounded-lg">
                          <p className="text-sm text-gray-500">Marwyck tape...</p>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 bg-white p-4">
                <div className="max-w-4xl mx-auto">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Tapez votre message ou une commande (ex: /relance, /estimation)..."
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-accent-cyan hover:bg-accent-cyan-hover text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Commandes disponibles: /relance, /estimation, /rdv, /docs
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          {activeTab === 'documents' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 font-plus-jakarta mb-2">
                    Documents
                  </h1>
                  <p className="text-gray-600">Gestion des pièces du dossier {activeDossier}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Checklist Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {documents.map(doc => (
                          <div key={doc.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {getStatusIcon(doc.status)}
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {doc.name}
                                </p>
                                <p className="text-xs text-gray-500">{doc.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {doc.status === 'missing' && (
                                <Button size="sm" variant="outline" className="text-accent-cyan border-accent-cyan">
                                  Relancer
                                </Button>
                              )}
                              {doc.status === 'received' && (
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Upload Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-accent-cyan transition-colors">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">
                          Glissez-déposez vos fichiers ici
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          PDF, DOC, DOCX jusqu'à 10MB
                        </p>
                        <Button size="sm" className="bg-accent-cyan hover:bg-accent-cyan-hover text-white">
                          Choisir des fichiers
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Planning */}
          {activeTab === 'planning' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 font-plus-jakarta mb-2">
                    Planning
                  </h1>
                  <p className="text-gray-600">Gestion de votre calendrier et rendez-vous</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">Calendrier de la semaine</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((day, index) => (
                            <div key={day} className="border-b border-gray-100 pb-4">
                              <h3 className="font-medium text-gray-900 mb-2">{day}</h3>
                              <div className="space-y-2">
                                {index === 0 && (
                                  <div className="bg-cyan-50 border border-cyan-200 rounded p-3">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">
                                          Visite 123 Oak Street
                                        </p>
                                        <p className="text-xs text-gray-500">14:00 - 15:00</p>
                                      </div>
                                      <Badge variant="outline" className="text-accent-cyan border-accent-cyan">
                                        Visite
                                      </Badge>
                                    </div>
                                  </div>
                                )}
                                {index === 1 && (
                                  <div className="bg-green-50 border border-green-200 rounded p-3">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">
                                          Signature notaire
                                        </p>
                                        <p className="text-xs text-gray-500">16:30 - 17:30</p>
                                      </div>
                                      <Badge variant="outline" className="text-green-600 border-green-600">
                                        Signature
                                      </Badge>
                                    </div>
                                  </div>
                                )}
                                {index > 1 && (
                                  <p className="text-sm text-gray-500 italic">Aucun rendez-vous</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">Actions rapides</CardTitle>
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

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">Rappels</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                            <div>
                              <p className="text-sm font-medium">Visite demain</p>
                              <p className="text-xs text-gray-500">Préparer les clés</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                            <div>
                              <p className="text-sm font-medium">Rappel SMS</p>
                              <p className="text-xs text-gray-500">Envoyer rappel client</p>
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

          {/* Communications */}
          {activeTab === 'communications' && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 font-plus-jakarta mb-2">
                    SMS & Appels
                  </h1>
                  <p className="text-gray-600">Historique des communications</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Messages récents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { type: 'sms', contact: 'John Smith', message: 'Rappel: Visite demain à 14h', time: '10:30', status: 'delivered' },
                          { type: 'email', contact: 'Marie Durant', message: 'Documents à signer envoyés', time: '09:15', status: 'opened' },
                          { type: 'sms', contact: 'Paul Martin', message: 'Estimation disponible', time: '08:45', status: 'sent' }
                        ].map((msg, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg">
                            <div className="flex-shrink-0">
                              {msg.type === 'sms' && <Smartphone className="w-5 h-5 text-accent-cyan" />}
                              {msg.type === 'email' && <Mail className="w-5 h-5 text-accent-cyan" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  {msg.contact}
                                </p>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-500">{msg.time}</span>
                                  {getStatusIcon(msg.status)}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Appels récents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { contact: 'John Smith', duration: '3:45', time: '14:20', type: 'outbound', status: 'completed' },
                          { contact: 'Marie Durant', duration: '1:20', time: '11:30', type: 'inbound', status: 'completed' },
                          { contact: 'Paul Martin', duration: '0:00', time: '10:15', type: 'outbound', status: 'missed' }
                        ].map((call, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg">
                            <div className="flex-shrink-0">
                              <PhoneCall className={`w-5 h-5 ${call.type === 'outbound' ? 'text-accent-cyan' : 'text-green-500'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  {call.contact}
                                </p>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-500">{call.time}</span>
                                  {getStatusIcon(call.status)}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
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