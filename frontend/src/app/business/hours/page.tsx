import React, { useState } from 'react';

type DayHours = {
  id: string;
  day: string;
  isOpen: boolean;
  openTime: string; // HH:mm format
  closeTime: string; // HH:mm format
};

const DAYS = [
  { id: 'sat', day: 'شنبه' },
  { id: 'sun', day: 'یکشنبه' },
  { id: 'mon', day: 'دوشنبه' },
  { id: 'tue', day: 'سه‌شنبه' },
  { id: 'wed', day: 'چهارشنبه' },
  { id: 'thu', day: 'پنجشنبه' },
  { id: 'fri', day: 'جمعه' },
];

export default function BusinessHoursPage() {
  const [hours, setHours] = useState<DayHours[]>(
    DAYS.map((d) => ({
      id: d.id,
      day: d.day,
      isOpen: false,
      openTime: '09:00',
      closeTime: '18:00',
    }))
  );

  const handleToggle = (dayId: string) => {
    setHours((prev) =>
      prev.map((h) =>
        h.id === dayId ? { ...h, isOpen: !h.isOpen } : h
      )
    );
  };

  const handleTimeChange = (
    dayId: string,
    field: 'openTime' | 'closeTime',
    value: string
  ) => {
    setHours((prev) =>
      prev.map((h) =>
        h.id === dayId ? { ...h, [field]: value } : h
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    console.log('Working hours to save:', hours);
    alert('ساعات کاری ذخیره شد!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        ویرایش ساعات کاری haftه‌ای
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {hours.map((day) => (
          <div
            key={day.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">{day.day}</span>
              <label className="relative inline-flex items-center pr-4">
                <input
                  type="checkbox"
                  checked={day.isOpen}
                  onChange={() => handleToggle(day.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-solid after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:left-5 peer-checked:after:border-white"></div>
              </label>
            </div>

            {day.isOpen ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-700">
                    ساعت شروع:
                  </label>
                  <input
                    type="time"
                    value={day.openTime}
                    onChange={(e) =>
                      handleTimeChange(day.id, 'openTime', e.target.value)
                    }
                    className="border rounded px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-700">
                    ساعت پایان:
                  </label>
                  <input
                    type="time"
                    value={day.closeTime}
                    onChange={(e) =>
                      handleTimeChange(day.id, 'closeTime', e.target.value)
                    }
                    className="border rounded px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">غیرفعال</p>
            )}
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            ذخیره تغییرات
          </button>
        </div>
      </form>
    </div>
  );
}