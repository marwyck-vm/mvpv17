'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, Calendar, FileText, BarChart3, Settings, Send, Plus, ChevronLeft, ChevronRight, Search, Filter, Download, Upload, Edit, Trash2, Eye, Clock, User, Phone, Mail, MapPin, DollarSign, TrendingUp, Users, CheckCircle, AlertCircle, Home, Building, Calculator, Palette, Sun, Moon, Menu, X, Bot, HelpCircle, Lightbulb, Zap, Target, ArrowRight, Star, Award, TrendingDown, Activity, PieChart, BarChart, LineChart, Calendar as CalendarIcon, Clock as ClockIcon, UserCheck, PhoneCall, MailIcon, MessageSquare, CheckSquare, AlertTriangle, Info, Briefcase, FileCheck, UserPlus, CalendarPlus, PhonePlus, MailPlus, MessageCirclePlus, CheckCirclePlus, AlertCirclePlus, InfoIcon, BriefcaseIcon, FileCheckIcon, UserPlusIcon, CalendarPlusIcon, PhonePlusIcon, MailPlusIcon, MessageCirclePlusIcon, CheckCirclePlusIcon, AlertCirclePlusIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'

export default function MarwyckCopilot() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showCreateEventModal, setShowCreateEventModal] = useState(false)
  const [showProposeModal, setShowProposeModal] = useState(false)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showAIHelpModal, setShowAIHelpModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm Marwyck, your AI real estate assistant. How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Sample data
  const dossiers = [
    {
      id: 1,
      address: '123 Oak Street',
      type: 'Sale',
      status: 'Active',
      priority: 'High',
      client: 'John Smith',
      value: '$450,000',
      progress: 75
    },
    {
      id: 2,
      address: '456 Pine Avenue',
      type: 'Purchase',
      status: 'Pending',
      priority: 'Medium',
      client: 'Sarah Johnson',
      value: '$320,000',
      progress: 45
    },
    {
      id: 3,
      address: '789 Elm Drive',
      type: 'Rental',
      status: 'Completed',
      priority: 'Low',
      client: 'Mike Wilson',
      value: '$2,500/mo',
      progress: 100
    }
  ]

  const events = [
    {
      id: 1,
      title: 'Property Viewing - 123 Oak Street',
      date: '2024-01-15',
      time: '14:00',
      client: 'John Smith',
      type: 'viewing',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Contract Signing - 456 Pine Avenue',
      date: '2024-01-16',
      time: '10:30',
      client: 'Sarah Johnson',
      type: 'signing',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Property Inspection - 789 Elm Drive',
      date: '2024-01-17',
      time: '09:00',
      client: 'Mike Wilson',
      type: 'inspection',
      status: 'confirmed'
    }
  ]

  const kpis = [
    {
      title: 'Active Dossiers',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: FileText
    },
    {
      title: 'Appointments This Week',
      value: '18',
      change: '+8%',
      trend: 'up',
      icon: Calendar
    },
    {
      title: 'Messages Sent',
      value: '156',
      change: '+23%',
      trend: 'up',
      icon: MessageCircle
    },
    {
      title: 'Time Saved',
      value: '32h',
      change: '+15%',
      trend: 'up',
      icon: Clock
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'message',
      content: 'Sent appointment reminder to John Smith',
      timestamp: '2 minutes ago',
      icon: MessageCircle
    },
    {
      id: 2,
      type: 'document',
      content: 'Generated contract for 456 Pine Avenue',
      timestamp: '15 minutes ago',
      icon: FileText
    },
    {
      id: 3,
      type: 'appointment',
      content: 'Scheduled viewing for tomorrow at 2 PM',
      timestamp: '1 hour ago',
      icon: Calendar
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
      return "I can help you schedule an appointment! I found these available time slots:\n\n• Tomorrow at 2:00 PM\n• Wednesday at 10:30 AM\n• Friday at 3:00 PM\n\nWhich one works best for you?"
    }
    
    if (lowerMessage.includes('document') || lowerMessage.includes('contract')) {
      return "I can assist with document management. Here's what I can do:\n\n• Generate contracts automatically\n• Track document status\n• Send reminders for missing documents\n• Create document templates\n\nWhat specific document do you need help with?"
    }
    
    if (lowerMessage.includes('client') || lowerMessage.includes('contact')) {
      return "I can help you manage client communications:\n\n• Send automated follow-ups\n• Schedule reminder messages\n• Track client preferences\n• Generate client reports\n\nWould you like me to send a follow-up to any specific client?"
    }
    
    return "I'm here to help you with:\n\n• Scheduling appointments\n• Managing documents\n• Client communications\n• Property valuations\n• Market analysis\n\nWhat would you like assistance with today?"
  }

  const goToPreviousWeek = () => {
    const newWeek = new Date(currentWeek)
    newWeek.setDate(currentWeek.getDate() - 7)
    setCurrentWeek(newWeek)
  }

  const goToNextWeek = () => {
    const newWeek = new Date(currentWeek)
    newWeek.setDate(currentWeek.getDate() + 7)
    setCurrentWeek(newWeek)
  }

  const getWeekDays = () => {
    const days = []
    const startOfWeek = new Date(currentWeek)
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 1) // Monday

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const getEventsForDay = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-background border-r border-border transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              {isDarkMode ? (
                <Image 
                  src="/logo-dark.svg" 
                  alt="Marwyck Logo" 
                  width={32} 
                  height={32}
                  className="rounded-lg"
                />
              ) : (
                <Image 
                  src="/logo-light.svg" 
                  alt="Marwyck Logo" 
                  width={32} 
                  height={32}
                  className="rounded-lg"
                />
              )}
            </div>
            <span className="font-bold text-lg">Marwyck</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="rounded-xl"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'chat', label: 'AI Assistant', icon: MessageCircle },
              { id: 'dossiers', label: 'Dossiers', icon: FileText },
              { id: 'planning', label: 'Planning', icon: Calendar },
              { id: 'communications', label: 'Communications', icon: Phone },
              { id: 'documents', label: 'Documents', icon: Building },
              { id: 'estimation', label: 'Estimation', icon: Calculator }
            ].map(item => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                className={`w-full justify-start rounded-xl ${sidebarCollapsed ? 'px-2' : 'px-4'}`}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {!sidebarCollapsed && item.label}
              </Button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="rounded-xl"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAIHelpModal(true)}
              className="rounded-xl"
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Header */}
        <header className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {activeSection === 'dashboard' && 'Dashboard'}
                {activeSection === 'chat' && 'AI Assistant'}
                {activeSection === 'dossiers' && 'Dossiers'}
                {activeSection === 'planning' && 'Planning'}
                {activeSection === 'communications' && 'Communications'}
                {activeSection === 'documents' && 'Documents'}
                {activeSection === 'estimation' && 'Estimation'}
              </h1>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="rounded-xl">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" className="rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Dashboard */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, index) => (
                  <Card key={index} className="rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {kpi.title}
                      </CardTitle>
                      <kpi.icon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpi.value}</div>
                      <p className={`text-xs ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.change} from last month
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-xl">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map(activity => (
                        <div key={activity.id} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <activity.icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.content}</p>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-xl">
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {events.slice(0, 3).map(event => (
                        <div key={event.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {event.date} at {event.time}
                            </p>
                          </div>
                          <Badge variant={event.status === 'confirmed' ? 'default' : 'secondary'}>
                            {event.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* AI Assistant Chat */}
          {activeSection === 'chat' && (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-auto mb-4">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 rounded-xl"
                />
                <Button onClick={handleSendMessage} className="rounded-xl">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Dossiers */}
          {activeSection === 'dossiers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Dossiers</h2>
                <Button className="rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  New Dossier
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dossiers.map(dossier => (
                  <Card key={dossier.id} className="rounded-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{dossier.address}</CardTitle>
                        <Badge variant={dossier.status === 'Active' ? 'default' : 'secondary'}>
                          {dossier.status}
                        </Badge>
                      </div>
                      <CardDescription>{dossier.type} • {dossier.client}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Value</span>
                          <span className="font-semibold">{dossier.value}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-medium">{dossier.progress}%</span>
                          </div>
                          <Progress value={dossier.progress} className="h-2" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Planning */}
          {activeSection === 'planning' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Planning</h2>
                  <p className="text-muted-foreground mt-1">Manage your appointments and schedule efficiently</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button onClick={() => setShowCreateEventModal(true)} className="rounded-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    New Event
                  </Button>
                  <Button variant="outline" onClick={() => setShowProposeModal(true)} className="rounded-xl">
                    <Calendar className="w-4 h-4 mr-2" />
                    Propose Slots
                  </Button>
                  <Button variant="outline" onClick={() => setShowRescheduleModal(true)} className="rounded-xl">
                    <Clock className="w-4 h-4 mr-2" />
                    Reschedule
                  </Button>
                </div>
              </div>

              {/* Week Navigation */}
              <div className="bg-card rounded-xl p-4">
                {/* Navigation arrows above the week display */}
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={goToPreviousWeek}
                    className="rounded-xl h-8 w-8 p-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={goToNextWeek}
                    className="rounded-xl h-8 w-8 p-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Week title */}
                <div className="mt-3">
                  <h3 className="text-lg font-semibold">
                    Week of {currentWeek.toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </h3>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {getWeekDays().map((day, index) => (
                  <Card key={index} className="rounded-xl">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                      </CardTitle>
                      <CardDescription className="text-lg font-semibold">
                        {day.getDate()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {getEventsForDay(day).map(event => (
                          <div
                            key={event.id}
                            className="p-2 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors"
                            onClick={() => setSelectedEvent(event)}
                          >
                            <p className="text-xs font-medium text-blue-800">{event.time}</p>
                            <p className="text-xs text-blue-600 truncate">{event.title}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Communications */}
          {activeSection === 'communications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Communications</h2>
                <div className="flex items-center space-x-2">
                  <Button className="rounded-xl">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    New Message
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 rounded-xl">
                  <CardHeader>
                    <CardTitle>Recent Communications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { type: 'email', contact: 'John Smith', message: 'Property viewing confirmation', time: '2 hours ago', status: 'sent' },
                        { type: 'sms', contact: 'Sarah Johnson', message: 'Contract ready for review', time: '4 hours ago', status: 'delivered' },
                        { type: 'call', contact: 'Mike Wilson', message: 'Follow-up call completed', time: '1 day ago', status: 'completed' }
                      ].map((comm, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            {comm.type === 'email' && <Mail className="w-5 h-5 text-blue-600" />}
                            {comm.type === 'sms' && <MessageCircle className="w-5 h-5 text-blue-600" />}
                            {comm.type === 'call' && <Phone className="w-5 h-5 text-blue-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{comm.contact}</p>
                              <Badge variant="outline">{comm.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{comm.message}</p>
                            <p className="text-xs text-muted-foreground">{comm.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-xl">
                  <CardHeader>
                    <CardTitle>Communication Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Emails Sent</span>
                        <span className="font-semibold">142</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SMS Sent</span>
                        <span className="font-semibold">89</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Calls Made</span>
                        <span className="font-semibold">34</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Response Rate</span>
                        <span className="font-semibold text-green-600">87%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Documents */}
          {activeSection === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Documents</h2>
                <div className="flex items-center space-x-2">
                  <Button className="rounded-xl">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    <Download className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Purchase Agreement - 123 Oak St', type: 'PDF', size: '2.4 MB', status: 'Signed', date: '2024-01-10' },
                  { name: 'Property Inspection Report', type: 'PDF', size: '1.8 MB', status: 'Pending', date: '2024-01-12' },
                  { name: 'Financial Pre-approval', type: 'PDF', size: '856 KB', status: 'Approved', date: '2024-01-08' },
                  { name: 'Property Photos - 456 Pine Ave', type: 'ZIP', size: '15.2 MB', status: 'Complete', date: '2024-01-14' },
                  { name: 'Market Analysis Report', type: 'PDF', size: '3.1 MB', status: 'Draft', date: '2024-01-15' },
                  { name: 'Client Information Form', type: 'PDF', size: '245 KB', status: 'Submitted', date: '2024-01-09' }
                ].map((doc, index) => (
                  <Card key={index} className="rounded-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{doc.name}</CardTitle>
                        <Badge variant={doc.status === 'Signed' || doc.status === 'Approved' || doc.status === 'Complete' ? 'default' : 'secondary'}>
                          {doc.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{doc.type}</span>
                          <span>{doc.size}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{doc.date}</p>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Estimation */}
          {activeSection === 'estimation' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Property Estimation</h2>
                <Button className="rounded-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  New Estimation
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-xl">
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Property Address</label>
                        <Input placeholder="Enter property address" className="rounded-xl" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Property Type</label>
                          <Select>
                            <SelectTrigger className="rounded-xl">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="house">House</SelectItem>
                              <SelectItem value="apartment">Apartment</SelectItem>
                              <SelectItem value="condo">Condo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Square Footage</label>
                          <Input type="number" placeholder="sq ft" className="rounded-xl" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Bedrooms</label>
                          <Input type="number" placeholder="0" className="rounded-xl" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Bathrooms</label>
                          <Input type="number" placeholder="0" className="rounded-xl" />
                        </div>
                      </div>
                      <Button className="w-full rounded-xl">
                        <Calculator className="w-4 h-4 mr-2" />
                        Generate Estimation
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-xl">
                  <CardHeader>
                    <CardTitle>Estimation Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">$425,000</div>
                        <p className="text-sm text-muted-foreground">Estimated Market Value</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Low Estimate</span>
                          <span className="font-medium">$395,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">High Estimate</span>
                          <span className="font-medium">$455,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Price per sq ft</span>
                          <span className="font-medium">$283</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Comparable Properties</p>
                        <div className="space-y-2">
                          {[
                            { address: '125 Oak Street', price: '$430,000', sqft: '1,520 sq ft' },
                            { address: '119 Oak Street', price: '$415,000', sqft: '1,480 sq ft' },
                            { address: '131 Oak Street', price: '$445,000', sqft: '1,580 sq ft' }
                          ].map((comp, index) => (
                            <div key={index} className="flex items-center justify-between text-xs p-2 bg-muted rounded-lg">
                              <span>{comp.address}</span>
                              <div className="text-right">
                                <div className="font-medium">{comp.price}</div>
                                <div className="text-muted-foreground">{comp.sqft}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>

        {/* Create Event Modal */}
        {showCreateEventModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-xl w-full max-w-md border shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Create New Event</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Event Title</label>
                  <Input
                    placeholder="Enter event title"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Input
                    type="date"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Time</label>
                  <Input
                    type="time"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Time</label>
                  <Input
                    type="time"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Client</label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    placeholder="Event description"
                    className="rounded-xl"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateEventModal(false)}
                    className="flex-1 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setShowCreateEventModal(false)}
                    className="flex-1 rounded-xl"
                  >
                    Create Event
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Propose Time Slots Modal */}
        {showProposeModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-xl w-full max-w-md border shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Propose Time Slots</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Client</label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Dates</label>
                  <Textarea
                    placeholder="Enter multiple date options..."
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time Slots</label>
                  <Textarea
                    placeholder="Enter available time slots..."
                    className="rounded-xl"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowProposeModal(false)}
                    className="flex-1 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setShowProposeModal(false)}
                    className="flex-1 rounded-xl"
                  >
                    Send Proposal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reschedule Modal */}
        {showRescheduleModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-xl w-full max-w-md border shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Reschedule Appointment</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Select Appointment</label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Choose appointment to reschedule" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map(event => (
                        <SelectItem key={event.id} value={event.id.toString()}>
                          {event.title} - {event.date}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">New Date</label>
                  <Input
                    type="date"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">New Time</label>
                  <Input
                    type="time"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Reason for Reschedule</label>
                  <Textarea
                    placeholder="Optional reason..."
                    className="rounded-xl"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowRescheduleModal(false)}
                    className="flex-1 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setShowRescheduleModal(false)}
                    className="flex-1 rounded-xl"
                  >
                    Reschedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-xl w-full max-w-md border shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Event Details</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Handle delete event
                    setSelectedEvent(null)
                  }}
                  className="rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Title:</span>
                  <p className="text-muted-foreground">{selectedEvent.title}</p>
                </div>
                <div>
                  <span className="font-medium">Date:</span>
                  <p className="text-muted-foreground">{selectedEvent.date}</p>
                </div>
                <div>
                  <span className="font-medium">Time:</span>
                  <p className="text-muted-foreground">{selectedEvent.time}</p>
                </div>
                <div>
                  <span className="font-medium">Client:</span>
                  <p className="text-muted-foreground">{selectedEvent.client}</p>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <Badge variant={selectedEvent.status === 'confirmed' ? 'default' : 'secondary'}>
                    {selectedEvent.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 rounded-xl"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedEvent(null)
                      setShowRescheduleModal(true)
                    }}
                    className="flex-1 rounded-xl"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Help Modal */}
        {showAIHelpModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto border shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-blue-600" />
                  AI Assistant Help
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAIHelpModal(false)}
                  className="rounded-xl"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                    What I can help you with:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { icon: Calendar, title: 'Schedule Appointments', desc: 'Automatically find and book available time slots' },
                      { icon: MessageCircle, title: 'Client Communications', desc: 'Send follow-ups, reminders, and updates' },
                      { icon: FileText, title: 'Document Management', desc: 'Generate contracts, track signatures, organize files' },
                      { icon: Calculator, title: 'Property Valuations', desc: 'Instant market analysis and price estimates' },
                      { icon: BarChart3, title: 'Market Insights', desc: 'Real-time market trends and analytics' },
                      { icon: Phone, title: 'Communication Tracking', desc: 'Log calls, emails, and messages automatically' }
                    ].map((feature, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <feature.icon className="w-4 h-4 mr-2 text-blue-600" />
                          <span className="font-medium text-sm">{feature.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-orange-500" />
                    Quick Commands:
                  </h4>
                  <div className="space-y-2">
                    {[
                      { command: '"Schedule a viewing for tomorrow"', desc: 'Automatically find available slots and send invites' },
                      { command: '"Send follow-up to John Smith"', desc: 'Generate and send personalized follow-up messages' },
                      { command: '"What\'s the market value of 123 Oak St?"', desc: 'Get instant property valuation and comparables' },
                      { command: '"Generate purchase agreement"', desc: 'Create legal documents with pre-filled information' }
                    ].map((cmd, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <code className="text-sm font-mono text-blue-600">{cmd.command}</code>
                        <p className="text-xs text-muted-foreground mt-1">{cmd.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-green-500" />
                    Tips for Best Results:
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Be specific with dates, times, and client names
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Use natural language - I understand context
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Ask follow-up questions for clarification
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      I learn from your preferences over time
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}