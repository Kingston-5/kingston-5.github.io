import React, { useState } from "react";
import { Loader, Button, Modal, Input } from "@/components";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/redux/store";
import { createDevice } from "@/features/devices/deviceSlice";
import { toast } from "@/utils/toast";

import type { IDeviceInput } from "@/features/devices/deviceSlice";
interface DeviceFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeviceForm: React.FC<DeviceFormProps> = ({ isOpen, onClose }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { isError, isLoading, message } = useSelector(
    (state: RootState) => state.devices
  );

  const [deviceName, setDeviceName] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const deviceData: IDeviceInput = {
      name: deviceName,
      userId: user?._id,
    };

    const resultAction = await dispatch(createDevice(deviceData));

    if (createDevice.fulfilled.match(resultAction)) {
      if (resultAction.payload.success) {
        toast.success("Device Added successfully");
        onClose();
      } else {
        toast.error(resultAction.payload.message || "Create Device Failed");
      }
    } else {
      const message =
        resultAction.payload?.message || "A network or server error occured";
      toast.error(message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error(message);
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Add Product">
        <form onSubmit={onSubmit}>
          <div>
            <Input
              label="Name"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
          </div>

          <Button type="submit">Add New Device</Button>
        </form>
      </Modal>
    </>
  );
};

export default DeviceForm;
