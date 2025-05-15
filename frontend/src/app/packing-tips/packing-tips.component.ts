import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-packing-tips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packing-tips.component.html',
  styleUrls: ['./packing-tips.component.css']
})
export class PackingTipsComponent {
  hikingTips = [
    "Go light – but never unsafe",
    "Use a layering system for clothing",
    "Modular packing in drybags or cubes",
    "Keep frequently used items at the top or outside",
    "Food: light, compact, and energy-dense",
    "Hydration is key",
    "Dry feet, happy hike",
    "Shelter: match it to the conditions",
    "Keep your gear dry",
    "Reflect and refine"
  ];

  paddlingTips = [
    "Use waterproof bags and pack modularly",
    "Keep weight low and centered in the boat",
    "Pack for quick deployment and emergencies",
    "Test-pack before your trip",
    "Dry and clean gear daily",
    "Prioritize multifunctional items",
    "Food: lightweight, high-calorie, and pack-safe",
    "Clothing: think in layers",
    "Bring minimal tools, but the right ones",
    "Learn to leave things out"
  ];
}
