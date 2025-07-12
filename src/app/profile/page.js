"use client";
import React, { useState } from 'react';
import { User, Mail, Phone, Edit2, X, Plus, Tag, ShoppingCart, Heart } from 'lucide-react';
import Image from 'next/image';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showAddPreference, setShowAddPreference] = useState(false);
    const [newPreference, setNewPreference] = useState('');

    const [userInfo, setUserInfo] = useState({
        name: 'Mohit Davar',
        email: 'mohitdavar@gamil.com.com',
        phone: '+91 9877123536',
        photo: 'https://picsum.photos/id/447/200/300'
    });

    const [preferences, setPreferences] = useState([
        'Low Sugar',
        'Low Salt',
        'Gluten free',
        'Organic',
    ]);

    const allPreferences = [
        'Vegetarian', 'Kosher', 'Halal', 'Vegan', 'High protein', 'Peanut free',
        'Lactose free', 'High iodine', 'Fresh Grocery',
        'Wheat free', 'Nut free', 'Soy free', 'Egg free', 'Gluten free',
        'Low carb', 'High protein', 'Keto', 'Mediterranean', 'Plant-based',
        'Organic', 'Non GMO', 'Raw food', 'Whole foods',
        'Low fat', 'Heart healthy', 'Diabetic friendly', 'Weight management',
        'Probiotic', 'Fiber rich', 'Antioxidant rich', 'Calcium rich',
        'Iron rich', 'Vitamin D', 'Omega 3', 'Superfood', 'Natural',
        'Preservative free', 'Artificial free',
        'Coconut products', 'Quinoa', 'Chia seeds',
        'Flax seeds', 'Hemp products', 'Spirulina', 'Turmeric',
        'Green tea', 'Matcha', 'Kombucha', 'Fermented foods'
    ];

    const suggestedPreferences = allPreferences.filter(pref => !preferences.includes(pref)).slice(0, 8);

    const handleSaveProfile = () => {
        setIsEditing(false);
    };

    const handleAddPreference = () => {
        if (newPreference.trim() && !preferences.includes(newPreference.trim())) {
            setPreferences([...preferences, newPreference.trim()]);
            setNewPreference('');
            setShowAddPreference(false);
        }
    };

    const handleRemovePreference = (prefToRemove) => {
        setPreferences(preferences.filter(pref => pref !== prefToRemove));
    };

    const handleSuggestedPreference = (suggestion) => {
        if (!preferences.includes(suggestion)) {
            setPreferences([...preferences, suggestion]);
        }
    };

    const getFilteredSuggestions = () => {
        if (!newPreference.trim()) return [];

        return allPreferences.filter(pref =>
            pref.toLowerCase().includes(newPreference.toLowerCase()) &&
            !preferences.includes(pref)
        ).slice(0, 6);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-4 space-y-6">
                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Profile</h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors self-start cursor-pointer "
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Profile Photo */}
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mx-auto md:mx-0">
                                <Image
                                    width={200}
                                    height={200}
                                    src={userInfo.photo}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <User size={16} className="inline mr-2" />
                                        Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={userInfo.name}
                                            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900 font-medium">{userInfo.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Mail size={16} className="inline mr-2" />
                                        Email
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={userInfo.email}
                                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900 font-medium">{userInfo.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Phone size={16} className="inline mr-2" />
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={userInfo.phone}
                                            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900 font-medium">{userInfo.phone}</p>
                                    )}
                                </div>
                            </div>

                            {isEditing && (
                                <div className="pt-4">
                                    <button
                                        onClick={handleSaveProfile}
                                        className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors font-medium cursor-pointer"
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Dietary Preferences */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Dietary Preferences</h2>
                        <button
                            onClick={() => setShowAddPreference(!showAddPreference)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors self-start mt-4 md:mt-0 cursor-pointer"
                        >
                            <Plus size={16} />
                            Add
                        </button>
                    </div>

                    {/* Add Preference Form */}
                    {showAddPreference && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={newPreference}
                                        onChange={(e) => setNewPreference(e.target.value)}
                                        placeholder="Enter dietary preference..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddPreference()}
                                    />

                                    {/* Search-based suggestions dropdown */}
                                    {newPreference.trim() && getFilteredSuggestions().length > 0 && (
                                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10 max-h-48 overflow-y-auto">
                                            {getFilteredSuggestions().map((suggestion, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        setNewPreference(suggestion);
                                                        handleAddPreference();
                                                    }}
                                                    className="w-full text-left px-3 py-2 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm border-b border-gray-100 last:border-b-0"
                                                >
                                                    <span className="font-medium">{suggestion}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddPreference}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowAddPreference(false);
                                            setNewPreference('');
                                        }}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Current Preferences */}
                    <div className="mb-6">
                        <h3 className="font-medium text-gray-800 mb-3">Current Preferences</h3>
                        <div className="flex flex-wrap gap-2">
                            {preferences.map((pref, index) => (
                                <span
                                    key={index}
                                    className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    <Tag size={14} />
                                    {pref}
                                    <button
                                        onClick={() => handleRemovePreference(pref)}
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        <X size={14} className='cursor-pointer'/>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Suggested Preferences */}
                    <div>
                        <h3 className="font-medium text-gray-800 mb-3">Common Preferences</h3>
                        <div className="flex flex-wrap gap-2">
                            {suggestedPreferences.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestedPreference(suggestion)}
                                    className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-yellow-100 hover:text-yellow-800 transition-colors cursor-pointer"
                                >
                                    <Plus size={14} />
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;