import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LinkCheckForm } from '@/components/features/LinkCheckForm';


function Hero () {
  return (
    <div className="hero">
 <section className="py-20 overflow-hidden px-4">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
              <span>Introducing LinkInsight</span>
              <Link to="/features" className="text-xs underline">Read more</Link>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
              Discover and fix
              <br />
              broken links
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
            LinkInsight is a comprehensive link analysis platform designed to help websites deliver exceptional user experiences by optimizing your link structures.            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link to="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
                  Start for free
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Get a demo
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LinkCheckForm />
          </div>
          
          <div className="mt-24">
            <div className="text-center text-sm text-muted-foreground mb-8">
              Trusted by businesses worldwide to maintain website integrity
            </div>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <img src="/placeholder.svg" alt="Company logo" className="h-8 opacity-70" />
              <img src="/placeholder.svg" alt="Company logo" className="h-8 opacity-70" />
              <img src="/placeholder.svg" alt="Company logo" className="h-8 opacity-70" />
              <img src="/placeholder.svg" alt="Company logo" className="h-8 opacity-70" />
            </div>
          </div>
        </div>
      </section>    
    </div>
  )
}
export default Hero;