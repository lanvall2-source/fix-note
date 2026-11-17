import React from 'react';
import { 
  Tv, Smartphone, Home, Shield, Car, Landmark, 
  Youtube, ShoppingBag, Bot, Music, Wifi, Flame, Zap, Droplets,
  HeartPulse, ShieldCheck, ShieldAlert, CarFront, ParkingCircle,
  Building2, CreditCard, Sparkles, HelpCircle
} from 'lucide-react';
import { CategoryType } from '../types';
import { CATEGORIES } from '../data/categories';

interface CategoryIconProps {
  category?: CategoryType;
  iconName?: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  iconName,
  className = 'w-5 h-5'
}) => {
  // 아이콘 명칭 우선 매핑
  const name = iconName || (category ? CATEGORIES[category]?.icon : '');

  switch (name) {
    case 'Tv': return <Tv className={className} />;
    case 'Smartphone': return <Smartphone className={className} />;
    case 'Home': return <Home className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Car': return <Car className={className} />;
    case 'Landmark': return <Landmark className={className} />;
    case 'Youtube': return <Youtube className={className} />;
    case 'ShoppingBag': return <ShoppingBag className={className} />;
    case 'Bot': return <Bot className={className} />;
    case 'Music': return <Music className={className} />;
    case 'Wifi': return <Wifi className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Droplets': return <Droplets className={className} />;
    case 'HeartPulse': return <HeartPulse className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'CarFront': return <CarFront className={className} />;
    case 'ParkingCircle': return <ParkingCircle className={className} />;
    case 'Building2': return <Building2 className={className} />;
    case 'CreditCard': return <CreditCard className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    default: return <HelpCircle className={className} />;
  }
};
