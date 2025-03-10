
import React from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  User,
  Lock,
  Globe,
  Bell,
  Shield,
  Save
} from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <DashboardSidebar />
      <div className="flex flex-col h-screen overflow-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Settings</h1>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="grid gap-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-4 rounded-xl">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-6 space-y-6">
                <Card className="border-primary/10">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Profile Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <form className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <Button variant="outline" size="sm" className="rounded-xl mr-2">
                            Upload
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-xl text-muted-foreground">
                            Remove
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                              First Name
                            </label>
                            <Input id="firstName" placeholder="First Name" defaultValue="John" className="rounded-xl" />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                              Last Name
                            </label>
                            <Input id="lastName" placeholder="Last Name" defaultValue="Doe" className="rounded-xl" />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address
                          </label>
                          <Input id="email" type="email" placeholder="Email" defaultValue="john.doe@example.com" className="rounded-xl" />
                        </div>
                        
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium mb-2">
                            Company Name
                          </label>
                          <Input id="company" placeholder="Company" defaultValue="Acme Inc." className="rounded-xl" />
                        </div>
                        
                        <div>
                          <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
                            Job Title
                          </label>
                          <Input id="jobTitle" placeholder="Job Title" defaultValue="Web Developer" className="rounded-xl" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="rounded-xl bg-primary">
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account" className="mt-6 space-y-6">
                <Card className="border-primary/10">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Account Security</CardTitle>
                    <CardDescription>Update your password and security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">
                          Current Password
                        </label>
                        <Input id="currentPassword" type="password" placeholder="••••••••" className="rounded-xl" />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                          New Password
                        </label>
                        <Input id="newPassword" type="password" placeholder="••••••••" className="rounded-xl" />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                          Confirm New Password
                        </label>
                        <Input id="confirmPassword" type="password" placeholder="••••••••" className="rounded-xl" />
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="text-sm font-medium mb-2">Two-Factor Authentication</h4>
                        <div className="flex items-center gap-4">
                          <Switch id="twoFactorAuth" />
                          <div>
                            <label htmlFor="twoFactorAuth" className="text-sm font-medium">Enable Two-Factor Authentication</label>
                            <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="rounded-xl bg-primary">
                          <Lock className="mr-2 h-4 w-4" />
                          Update Security Settings
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/10">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible account actions</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="rounded-xl border border-destructive/20 p-4">
                      <h4 className="text-sm font-medium text-destructive mb-2">Delete Account</h4>
                      <p className="text-xs text-muted-foreground mb-4">
                        Once you delete your account, there is no going back. All your data will be permanently removed.
                      </p>
                      <Button variant="outline" className="rounded-xl text-destructive border-destructive/50 hover:bg-destructive/10">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-6 space-y-6">
                <Card className="border-primary/10">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Notification Preferences</CardTitle>
                    <CardDescription>Control how you receive notifications</CardDescription>
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
                    
                    <div className="mt-6 flex justify-end">
                      <Button className="rounded-xl bg-primary">
                        <Bell className="mr-2 h-4 w-4" />
                        Save Notification Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="advanced" className="mt-6 space-y-6">
                <Card className="border-primary/10">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Advanced Settings</CardTitle>
                    <CardDescription>Configure advanced application settings</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Link Check Frequency</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline" 
                            className="rounded-xl border-primary text-primary"
                          >
                            Hourly
                          </Button>
                          <Button variant="outline" className="rounded-xl">Daily</Button>
                          <Button variant="outline" className="rounded-xl">Weekly</Button>
                          <Button variant="outline" className="rounded-xl">Custom</Button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Default Redirect Behavior</h4>
                        <div className="flex items-center gap-4">
                          <Switch id="follow-redirects" defaultChecked />
                          <div>
                            <label htmlFor="follow-redirects" className="text-sm font-medium">Follow Redirects</label>
                            <p className="text-xs text-muted-foreground">Track redirected links to their final destination</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">API Access</h4>
                        <div className="rounded-xl bg-card border p-3 mb-2">
                          <div className="flex items-center justify-between">
                            <div className="font-mono text-xs truncate w-64">sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                            <Button variant="ghost" size="sm" className="h-8 rounded-xl">
                              Copy
                            </Button>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl">
                          Regenerate API Key
                        </Button>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Data Export</h4>
                        <Button variant="outline" className="rounded-xl">
                          Export All Data
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button className="rounded-xl bg-primary">
                        <Save className="mr-2 h-4 w-4" />
                        Save Advanced Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/10">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Integrations</CardTitle>
                    <CardDescription>Connect to other services</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-blue-500 flex items-center justify-center text-white">
                            <Globe className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Google Analytics</h4>
                            <p className="text-xs text-muted-foreground">Track link performance in GA</p>
                          </div>
                        </div>
                        <Switch id="ga-integration" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-purple-500 flex items-center justify-center text-white">
                            <Bell className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Slack Notifications</h4>
                            <p className="text-xs text-muted-foreground">Send alerts to Slack</p>
                          </div>
                        </div>
                        <Switch id="slack-integration" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-blue-600 flex items-center justify-center text-white">
                            <Shield className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Cloudflare</h4>
                            <p className="text-xs text-muted-foreground">Integrate with Cloudflare DNS</p>
                          </div>
                        </div>
                        <Switch id="cloudflare-integration" defaultChecked />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button className="rounded-xl bg-primary">
                        <Save className="mr-2 h-4 w-4" />
                        Save Integration Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
