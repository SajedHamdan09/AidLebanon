'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

export default function RequestAid() {
  const [centers, setCenters] = useState<
    { id: number; name: string }[] // Adjusted state type
  >([]);
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchCenters = async () => {
      try {
        const response = await fetch('http://localhost:8080/aidcenter/all'); // Replace with your API URL

        if (!response.ok) {
          throw new Error(`Failed to fetch centers: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        if (isMounted) {
          if (Array.isArray(data)) {
            if (data.length > 0) {
              // Transform API data into the desired format (adjusted)
              const transformedCenters = data.map((center) => ({
                id: center.centerId,
                name: center.name,
              }));

              setCenters(transformedCenters); // Update state
            } else {
              console.warn('API returned empty data');
              setCenters([]); // Handle empty data
            }
          } else {
            console.error('API returned invalid data:', data);
            setCenters([]); // Handle invalid data
          }
        }
      } catch (error) {
        console.error('Error fetching centers:', error);
      }
    };

    fetchCenters();

    return () => {
      isMounted = false; // Cleanup on component unmount
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Request Submitted',
      description: 'Your aid request has been submitted successfully',
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Side: Aid Centers */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Select a Center</h2>
          <div className="grid gap-4">
            {centers.length === 0 ? (
              <p>No centers available. Please try again later.</p>
            ) : (
              centers.map((center) => (
                <Card
                  key={center.id}
                  className={`cursor-pointer transition-colors ${
                    selectedCenter === center.id ? 'border-primary' : ''
                  }`}
                  onClick={() => setSelectedCenter(center.id)}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <img
                      src="/placeholder.svg" // Placeholder for now
                      alt={`${center.name} logo`}
                      className="w-12 h-12 rounded-full"
                    />
                    <span className="font-medium">{center.name}</span>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Aid Request Form */}
        <div>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Aid Title */}
                <div className="space-y-2">
                  <Label htmlFor="aid-type">Aid Title</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select aid type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="clothes">Clothes</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Product Names */}
                <div className="space-y-2">
                  <Label htmlFor="products">Specify Names of Products</Label>
                  <Input id="products" placeholder="Enter product names" />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter your location" />
                </div>

                {/* Pickup Time */}
                <div className="space-y-2">
                  <Label htmlFor="pickup-time">Pickup Time</Label>
                  <Input id="pickup-time" type="datetime-local" />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the data policy sharing terms
                  </label>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}