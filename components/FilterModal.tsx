import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

interface FilterState {
  location: string;
  category: string;
  activities: string[];
  price: number;
  startTime: string;
  groupSize: number;
  vehicle: string[];
  features: string[];
}

const FilterModal = ({ isOpen, onClose, onApplyFilters }: FilterModalProps) => {
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    category: '',
    activities: [],
    price: 12500,
    startTime: '17:00',
    groupSize: 40,
    vehicle: [],
    features: []
  });

  // Aktif filtreleme kategorisini takip etmek için yeni state
  const [activeFilterType, setActiveFilterType] = useState<'location' | 'category' | 'activities' | 'vehicle' | 'features' | null>(null);

  const handleLocationChange = (value: string) => {
    if (value) {
      setActiveFilterType('location');
      setFilters({
        ...filters,
        location: value,
        category: '',
        activities: []
      });
    } else {
      setActiveFilterType(null);
      setFilters({
        ...filters,
        location: ''
      });
    }
  };

  const handleCategorySelect = (category: string) => {
    if (filters.category === category) {
      setActiveFilterType(null);
      setFilters({
        ...filters,
        category: ''
      });
    } else {
      setActiveFilterType('category');
      setFilters({
        ...filters,
        category,
        location: '',
        activities: []
      });
    }
  };

  const handleActivitySelect = (activity: string) => {
    const newActivities = toggleSelection(filters.activities, activity);
    if (newActivities.length > 0) {
      setActiveFilterType('activities');
      setFilters({
        ...filters,
        activities: newActivities,
        location: '',
        category: ''
      });
    } else {
      setActiveFilterType(null);
      setFilters({
        ...filters,
        activities: []
      });
    }
  };

  const handleVehicleSelect = (vehicle: string) => {
    const newVehicles = toggleSelection(filters.vehicle, vehicle);
    if (newVehicles.length > 0) {
      setActiveFilterType('vehicle');
      setFilters({
        ...filters,
        vehicle: newVehicles,
        location: '',
        category: '',
        activities: [],
        features: []
      });
    } else {
      setActiveFilterType(null);
      setFilters({
        ...filters,
        vehicle: []
      });
    }
  };

  const handleFeatureSelect = (feature: string) => {
    const newFeatures = toggleSelection(filters.features, feature);
    if (newFeatures.length > 0) {
      setActiveFilterType('features');
      setFilters({
        ...filters,
        features: newFeatures,
        location: '',
        category: '',
        activities: [],
        vehicle: []
      });
    } else {
      setActiveFilterType(null);
      setFilters({
        ...filters,
        features: []
      });
    }
  };

  const handleReset = () => {
    setActiveFilterType(null);
    setFilters({
      location: '',
      category: '',
      activities: [],
      price: 12500,
      startTime: '17:00',
      groupSize: 40,
      vehicle: [],
      features: []
    });
  };

  const toggleSelection = (array: string[], item: string) => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full h-full md:w-[400px] p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">TOURS</h2>
          <button onClick={onClose} className="p-2">
            <FiX size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Location */}
          <div>
            <label className="block mb-2">Location</label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => handleLocationChange(e.target.value)}
              placeholder="Where you wanna visit?"
              className={`w-full p-2 border rounded ${
                activeFilterType && activeFilterType !== 'location' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={Boolean(activeFilterType && activeFilterType !== 'location')}
            />
          </div>

          {/* Theme */}
          <div>
            <label className="block mb-2">Theme</label>
            <div className="flex flex-wrap gap-2">
              {['Island Tour', 'Land Tour', 'Safari'].map(category => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  disabled={Boolean(activeFilterType && activeFilterType !== 'category')}
                  className={`px-4 py-2 rounded ${
                    filters.category === category 
                      ? 'bg-primary text-white' 
                      : activeFilterType && activeFilterType !== 'category'
                      ? 'border opacity-50 cursor-not-allowed'
                      : 'border hover:bg-gray-100'
                  }`}
                >
                  {category} (43)
                </button>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <label className="block mb-2">Activities</label>
            <div className="flex flex-wrap gap-2">
              {['Swimming', 'Snorkeling', 'Elephant Care', 'Kayaking'].map(activity => (
                <button
                  key={activity}
                  onClick={() => handleActivitySelect(activity)}
                  disabled={Boolean(activeFilterType && activeFilterType !== 'activities')}
                  className={`px-4 py-2 rounded ${
                    filters.activities.includes(activity)
                      ? 'bg-primary text-white'
                      : activeFilterType && activeFilterType !== 'activities'
                      ? 'border opacity-50 cursor-not-allowed'
                      : 'border hover:bg-gray-100'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle */}
          <div>
            <label className="block mb-2">Vehicle</label>
            <div className="flex flex-wrap gap-2">
              {[
                'Yacht',
                'Speedboat',
                'Safari',
                'Catamaran',
                'Speedcatamaran'
              ].map(vehicle => (
                <button
                  key={vehicle}
                  onClick={() => handleVehicleSelect(vehicle)}
                  disabled={Boolean(activeFilterType && activeFilterType !== 'vehicle')}
                  className={`px-4 py-2 rounded ${
                    filters.vehicle.includes(vehicle)
                      ? 'bg-primary text-white'
                      : activeFilterType && activeFilterType !== 'vehicle'
                      ? 'border opacity-50 cursor-not-allowed'
                      : 'border hover:bg-gray-100'
                  }`}
                >
                  {vehicle} (43)
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block mb-2">Features</label>
            <div className="flex flex-wrap gap-2">
              {[
                'Transfer',
                'Halal Food',
                'Vegetarian food'
              ].map(feature => (
                <button
                  key={feature}
                  onClick={() => handleFeatureSelect(feature)}
                  disabled={Boolean(activeFilterType && activeFilterType !== 'features')}
                  className={`px-4 py-2 rounded ${
                    filters.features.includes(feature)
                      ? 'bg-primary text-white'
                      : activeFilterType && activeFilterType !== 'features'
                      ? 'border opacity-50 cursor-not-allowed'
                      : 'border hover:bg-gray-100'
                  }`}
                >
                  {feature} (43)
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2">Price</label>
            <input
              type="range"
              min="0"
              max="25000"
              value={filters.price}
              onChange={(e) => setFilters({...filters, price: Number(e.target.value)})}
              className="w-full"
            />
            <div className="text-right">THB {filters.price}</div>
          </div>

          {/* Start Time */}
          <div>
            <label className="block mb-2">Start-Time</label>
            <input
              type="range"
              min="0"
              max="24"
              value={parseInt(filters.startTime)}
              onChange={(e) => {
                const hour = e.target.value.padStart(2, '0');
                setFilters({...filters, startTime: `${hour}:00`});
              }}
              className="w-full"
            />
            <div className="text-right">{filters.startTime}</div>
          </div>

          {/* Group Size */}
          <div>
            <label className="block mb-2">Group-Size</label>
            <input
              type="range"
              min="1"
              max="50"
              value={filters.groupSize}
              onChange={(e) => setFilters({...filters, groupSize: Number(e.target.value)})}
              className="w-full"
            />
            <div className="text-right">{filters.groupSize} Person</div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button 
              className="flex-1 py-2 rounded bg-gray-200"
              onClick={handleReset}
            >
              RESET
            </button>
            <button 
              className="flex-1 py-2 rounded bg-primary text-white"
              onClick={() => {
                onApplyFilters(filters);
                onClose();
              }}
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal; 