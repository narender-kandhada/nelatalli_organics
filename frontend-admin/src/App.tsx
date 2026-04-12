/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { InventoryScreen } from './components/InventoryScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { CustomersScreen } from './components/CustomersScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { SupportScreen } from './components/SupportScreen';
import { Chatbot } from './components/Chatbot';
import { Screen } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  if (currentScreen === 'login') {
    return <LoginScreen onLogin={() => setCurrentScreen('dashboard')} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'inventory':
        return <InventoryScreen />;
      case 'orders':
        return <OrdersScreen />;
      case 'customers':
        return <CustomersScreen />;
      case 'analytics':
        return <AnalyticsScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'support':
        return <SupportScreen />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="font-serif text-4xl mb-4 italic">Coming Soon</h2>
              <p className="text-secondary font-bold uppercase tracking-widest">The {currentScreen} module is under construction.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <main className="flex-1 flex flex-col min-w-0">
        <TopBar currentScreen={currentScreen} />
        <div className="flex-1 overflow-y-auto">
          {renderScreen()}
        </div>
      </main>
      <Chatbot />
    </div>
  );
}
