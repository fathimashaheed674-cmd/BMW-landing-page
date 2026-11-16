export interface Hotspot {
  id: string;
  name: string;
  code: string;
  category: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  title: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string }[];
  highlightColor?: string;
}

export interface DriveMode {
  id: string;
  name: string;
  power: string;
  torque: string;
  acceleration: string;
  damping: string;
  soundProfile: string;
  description: string;
}

export interface DesignFeature {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  description: string;
  specs: string;
}
