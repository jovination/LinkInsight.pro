
import React from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  Settings,
  Mail,
  AlertOctagon,
  Clock,
  CheckCircle2,
  BarChart3
} from 'lucide-react';

const NotificationsPage = () => {
  const notifications = [
    { 
      id: 1, 
      type: 'alert', 
      title: 'Link Check Failed', 
      description: 'https://example.com/products is returning a 404 error', 
      time: '2 hours ago',
      read: false
    },
    { 
      id: 2, 
      type: 'info', 
      title: 'Weekly Report Available', 
      description: 'Your weekly link health report is now available to view', 
      time: '1 day ago',
      read: true
    },
    { 
      id: 3, 
      type: 'success', 
      title: 'Link Fixed', 
      description: 'https://example.com/about is now working correctly', 
      time: '2 days ago',
      read: true
    },
    { 
      id: 4, 
      type: 'alert', 
      title: 'Slow Response Time', 
      description: 'https://example.com/blog is responding slowly (>3s)', 
      time: '3 days ago',
      read: true
    },
    { 
      id: 5, 
      type: 'info', 
      title: 'New Feature Available', 
      description: 'We\'ve added enhanced link monitoring features to your plan', 
      time: '5 days ago',
      read: true
    },
  ];

  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <DashboardSidebar />
      <div className="flex flex-col h-screen overflow-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Notifications</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Settings className="mr-2 h-4 w-4" />
              Notification Settings
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary-600 rounded-xl">
              <Bell className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="grid gap-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList className="grid w-[400px] grid-cols-3 rounded-xl">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-4">
                <Card className="border-primary/10">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Recent Notifications</CardTitle>
                    <CardDescription>Stay updated with your link status and system notices</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`flex items-start gap-4 px-4 py-4 ${!notification.read ? 'bg-primary/5' : ''}`}>
                          <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center 
                            ${notification.type === 'alert' ? 'bg-red-100 text-red-600' : 
                              notification.type === 'success' ? 'bg-green-100 text-green-600' : 
                              'bg-blue-100 text-blue-600'}`
                          }>
                            {notification.type === 'alert' && <AlertOctagon className="h-4 w-4" />}
                            {notification.type === 'success' && <CheckCircle2 className="h-4 w-4" />}
                            {notification.type === 'info' && <BarChart3 className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className={`text-sm font-medium ${!notification.read ? 'text-primary' : ''}`}>
                                {notification.title}
                              </h4>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {notification.time}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="unread" className="mt-4">
                <Card className="border-primary/10">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Unread Notifications</CardTitle>
                    <CardDescription>Notifications you haven't read yet</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {notifications.filter(n => !n.read).map((notification) => (
                        <div key={notification.id} className={`flex items-start gap-4 px-4 py-4 bg-primary/5`}>
                          <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center 
                            ${notification.type === 'alert' ? 'bg-red-100 text-red-600' : 
                              notification.type === 'success' ? 'bg-green-100 text-green-600' : 
                              'bg-blue-100 text-blue-600'}`
                          }>
                            {notification.type === 'alert' && <AlertOctagon className="h-4 w-4" />}
                            {notification.type === 'success' && <CheckCircle2 className="h-4 w-4" />}
                            {notification.type === 'info' && <BarChart3 className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-primary">
                                {notification.title}
                              </h4>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {notification.time}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                      ))}
                      {notifications.filter(n => !n.read).length === 0 && (
                        <div className="p-6 text-center">
                          <p className="text-muted-foreground">No unread notifications</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="alerts" className="mt-4">
                <Card className="border-primary/10">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Alert Notifications</CardTitle>
                    <CardDescription>Important alerts about your links</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {notifications.filter(n => n.type === 'alert').map((notification) => (
                        <div key={notification.id} className={`flex items-start gap-4 px-4 py-4 ${!notification.read ? 'bg-primary/5' : ''}`}>
                          <div className="mt-1 h-8 w-8 rounded-full flex items-center justify-center bg-red-100 text-red-600">
                            <AlertOctagon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className={`text-sm font-medium ${!notification.read ? 'text-primary' : ''}`}>
                                {notification.title}
                              </h4>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {notification.time}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <Card className="border-primary/10">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Notification Preferences</CardTitle>
                <CardDescription>Customize how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Email Notifications</h4>
                      <p className="text-xs text-muted-foreground">Receive important alerts via email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Weekly Digest</h4>
                      <p className="text-xs text-muted-foreground">Receive a weekly summary of your link health</p>
                    </div>
                    <Switch id="weekly-digest" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Alert Notifications</h4>
                      <p className="text-xs text-muted-foreground">Receive alerts when links go down</p>
                    </div>
                    <Switch id="alert-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Product Updates</h4>
                      <p className="text-xs text-muted-foreground">Receive notifications about new features</p>
                    </div>
                    <Switch id="product-updates" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Browser Notifications</h4>
                      <p className="text-xs text-muted-foreground">Show notifications in your browser</p>
                    </div>
                    <Switch id="browser-notifications" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;
