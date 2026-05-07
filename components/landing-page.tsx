'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BarChart3,
  Lock,
  Radio,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Navigation */}
      <nav className='fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center'>
              <Radio className='w-5 h-5 text-white' />
            </div>
            <span className='text-xl font-bold text-foreground'>
              HotSpot Manager
            </span>
          </div>
          <div className='hidden md:flex items-center gap-8'>
            <a
              href='#features'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              Features
            </a>
            <a
              href='#benefits'
              className='text-muted-foreground hover:text-foreground transition-colors'
            >
              Benefits
            </a>
          </div>
          <div className='flex items-center gap-4'>
            <Link href='/login'>
              <Button
                variant='outline'
                className='border-border hover:bg-background/50'
              >
                Sign In
              </Button>
            </Link>
            <Link href='/signup'>
              <Button className='bg-linear-to-r from-primary to-accent hover:opacity-90'>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className='pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background via-background to-card/30'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20'>
            <div className='space-y-8'>
              <div className='inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/30 rounded-full'>
                <Zap className='w-4 h-4 text-primary mr-2' />
                <span className='text-sm font-semibold text-primary'>
                  Advanced Network Management
                </span>
              </div>
              <h1 className='text-5xl lg:text-6xl font-bold text-foreground leading-tight'>
                Control Your Hotspot Network with Confidence
              </h1>
              <p className='text-xl text-muted-foreground leading-relaxed'>
                Complete Mikrotik hotspot management platform. Monitor routers
                in real-time, manage users effortlessly, and grow your ISP
                business with advanced analytics.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                <Link href='/signup'>
                  <Button
                    size='lg'
                    className='bg-linear-to-r from-primary to-accent hover:opacity-90 text-lg px-8 w-full sm:w-auto'
                  >
                    Start Free Trial
                    <ArrowRight className='ml-2 w-5 h-5' />
                  </Button>
                </Link>
                <Button
                  size='lg'
                  variant='outline'
                  className='border-border hover:bg-background/50 text-lg px-8'
                >
                  Watch Demo
                </Button>
              </div>
              <div className='flex items-center gap-8 pt-4 border-t border-border'>
                <div>
                  <div className='text-2xl font-bold text-foreground'>10k+</div>
                  <div className='text-sm text-muted-foreground'>
                    Active Users
                  </div>
                </div>
                <div>
                  <div className='text-2xl font-bold text-foreground'>
                    99.9%
                  </div>
                  <div className='text-sm text-muted-foreground'>Uptime</div>
                </div>
                <div>
                  <div className='text-2xl font-bold text-foreground'>50ms</div>
                  <div className='text-sm text-muted-foreground'>
                    Avg Response
                  </div>
                </div>
              </div>
            </div>
            {/* Hero Visual */}
            <div className='relative h-96 lg:h-full'>
              <div className='absolute inset-0 bg-linear-to-br from-primary/30 via-accent/20 to-transparent rounded-2xl blur-3xl'></div>
              <div className='relative h-full bg-linear-to-br from-card to-background/50 border border-border rounded-2xl p-8 flex flex-col justify-between overflow-hidden'>
                <div className='space-y-4'>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 rounded-full bg-green-500'></div>
                    <span className='text-sm font-semibold text-foreground'>
                      12 Routers Online
                    </span>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <span className='text-xs text-muted-foreground'>
                        Network Usage
                      </span>
                      <span className='text-xs text-foreground font-semibold'>
                        67%
                      </span>
                    </div>
                    <div className='w-full h-2 bg-background rounded-full overflow-hidden'>
                      <div className='h-full w-2/3 bg-linear-to-r from-primary to-accent rounded-full'></div>
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-background/50 rounded-lg p-3 border border-border'>
                    <div className='text-xs text-muted-foreground mb-1'>
                      Active Users
                    </div>
                    <div className='text-2xl font-bold text-foreground'>
                      2,847
                    </div>
                  </div>
                  <div className='bg-background/50 rounded-lg p-3 border border-border'>
                    <div className='text-xs text-muted-foreground mb-1'>
                      Daily Revenue
                    </div>
                    <div className='text-2xl font-bold text-accent'>KES 4,250</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id='features' className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-foreground mb-4'>
              Powerful Features
            </h2>
            <p className='text-xl text-muted-foreground'>
              Everything you need to manage your hotspot network
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                icon: BarChart3,
                title: 'Real-time Analytics',
                desc: 'Monitor router performance and revenue metrics',
              },
              {
                icon: Users,
                title: 'User Management',
                desc: 'Create and manage hotspot users effortlessly',
              },
              {
                icon: Zap,
                title: 'Fast Performance',
                desc: 'Lightning-fast response times and sync',
              },
              {
                icon: Lock,
                title: 'Enterprise Security',
                desc: 'Bank-level encryption and access control',
              },
              {
                icon: TrendingUp,
                title: 'Revenue Optimization',
                desc: 'Track and maximize your business growth',
              },
              {
                icon: Radio,
                title: 'Multi-Router Support',
                desc: 'Manage unlimited routers from one dashboard',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className='bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors group'
              >
                <feature.icon className='w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors' />
                <h3 className='text-xl font-bold text-foreground mb-2'>
                  {feature.title}
                </h3>
                <p className='text-muted-foreground'>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto bg-linear-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 rounded-2xl p-12 text-center'>
          <h2 className='text-4xl font-bold text-foreground mb-4'>
            Ready to Scale Your ISP Business?
          </h2>
          <p className='text-xl text-muted-foreground mb-8'>
            Join thousands of ISPs managing their hotspot networks
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/signup'>
              <Button
                size='lg'
                className='bg-linear-to-r from-primary to-accent hover:opacity-90 px-8'
              >
                Start Free Trial
              </Button>
            </Link>
            <Button
              size='lg'
              variant='outline'
              className='border-border hover:bg-background/50 px-8'
            >
              Schedule Demo
            </Button>
          </div>
          <p className='text-sm text-muted-foreground mt-6'>
            No credit card required. 14-day free trial.
          </p>
        </div>
      </section>
      {/* Footer */}
      <footer className='border-t border-border bg-card/50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <div className='w-8 h-8 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center'>
                  <Radio className='w-5 h-5 text-white' />
                </div>
                <span className='font-bold text-foreground'>
                  HotSpot Manager
                </span>
              </div>
              <p className='text-sm text-muted-foreground'>
                ISP management for Mikrotik
              </p>
            </div>
            <div>
              <h4 className='font-bold text-foreground mb-4'>Product</h4>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li>
                  <a
                    href='#features'
                    className='hover:text-foreground transition-colors'
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-bold text-foreground mb-4'>Company</h4>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-bold text-foreground mb-4'>Legal</h4>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between'>
            <p className='text-sm text-muted-foreground'>
              © 2026 HotSpot Manager. All rights reserved.
            </p>
            <div className='flex gap-6 mt-4 md:mt-0'>
              <a
                href='#'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Twitter
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                GitHub
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
