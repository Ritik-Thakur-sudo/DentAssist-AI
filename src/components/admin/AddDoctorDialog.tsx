import { useCreateDoctor } from '@/hooks/use-doctors';
import { Gender } from '@prisma/client';
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { formatIndianMobile } from '@/lib/utils';

interface AddDoctorDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

function AddDoctorDialog({ isOpen, onClose }: AddDoctorDialogProps) {

    const [newDoctor, setNewDoctor] = useState({
        name: "",
        email: "",
        phone: "",
        speciality: "",
        gender: "MALE" as Gender,
        isActive: true,
    });

    const createDoctorMutation = useCreateDoctor();

    const handlePhoneChange = (value: string) => {
        const formattedPhoneNumber = formatIndianMobile(value)
        setNewDoctor({ ...newDoctor, phone: formattedPhoneNumber });
    }

    const handleSave = () => {
        createDoctorMutation.mutate(
            { ...newDoctor },
            {
                onSuccess: () => {
                    handleClose();
                }
            }
        );
    };

    const handleClose = () => {
        onClose();
        setNewDoctor({
            name: "",
            email: "",
            phone: "",
            speciality: "",
            gender: "MALE" as Gender,
            isActive: true,
        });
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) handleClose();
            }}
        >
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Doctor</DialogTitle>
                    <DialogDescription>Add a new doctor to your practice.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Name *</Label>
                            <Input
                                value={newDoctor.name}
                                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                                placeholder="Dr. John Smith"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Speciality *</Label>
                            <Input
                                value={newDoctor.speciality}
                                onChange={(e) => setNewDoctor({ ...newDoctor, speciality: e.target.value })}
                                placeholder="General Dentistry"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Email *</Label>
                        <Input
                            type="email"
                            value={newDoctor.email}
                            onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                            placeholder="doctor@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                            value={newDoctor.phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            placeholder="9999999999"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Gender</Label>
                            <Select
                                value={newDoctor.gender}
                                onValueChange={(value) =>
                                    setNewDoctor({ ...newDoctor, gender: value as Gender })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MALE">Male</SelectItem>
                                    <SelectItem value="FEMALE">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                value={newDoctor.isActive ? "active" : "inactive"}
                                onValueChange={(value) =>
                                    setNewDoctor({ ...newDoctor, isActive: value === "active" })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSave}
                        disabled={
                            !newDoctor.name ||
                            !newDoctor.email ||
                            !newDoctor.speciality ||
                            createDoctorMutation.isPending
                        }
                    >
                        {createDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddDoctorDialog;