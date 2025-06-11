import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const locationSchema = z.object({
  plant: z.string().min(1, "Plant is required"),
  area: z.string().min(1, "Area is required"),
  parentGroupName: z.string().min(1, "Parent Group Name is required"),
  groupName: z.string().min(1, "Group Name is required"),
});

type LocationFormData = z.infer<typeof locationSchema>;

interface LocationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: LocationFormData) => void;
}

const plantOptions = [
  { value: "wsp", label: "WSP" },
  { value: "lap", label: "LAP" },
  { value: "wep", label: "WEP" },
  { value: "vep", label: "VEP" },
];

const areaOptions = [
  { value: "chassis", label: "Chassis" },
  { value: "body", label: "Body" },
  { value: "frame", label: "Frame" },
];

const parentGroupOptions = [
  { value: "headassembly", label: "Head Assembly" },
  { value: "engineassembly", label: "Engine Assembly" },
  { value: "bodyframing", label: "Body Framing" },
  { value: "crankshaft", label: "Crankshaft Machining" },
];

const groupNameOptions = [{ value: "casemod", label: "Case Mod A" }];

const LocationModal = ({ open, onClose, onSubmit }: LocationModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      plant: "",
      area: "",
      parentGroupName: "",
      groupName: "",
    },
  });

  const handleFormSubmit = async (data: LocationFormData) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          borderBottom: 1,
          borderColor: "grey.200",
        }}
      >
        Change Location
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <Box sx={{ display: "flex", gap: 2.5 }}>
              <Controller
                name="plant"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Plant"
                    fullWidth
                    error={!!errors.plant}
                    helperText={errors.plant?.message}
                    sx={{ flex: 1 }}
                  >
                    <MenuItem value="">
                      <em>Select Plant</em>
                    </MenuItem>
                    {plantOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Area"
                    fullWidth
                    error={!!errors.area}
                    helperText={errors.area?.message}
                    sx={{ flex: 1 }}
                  >
                    <MenuItem value="">
                      <em>Select Area</em>
                    </MenuItem>
                    {areaOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2.5 }}>
              <Controller
                name="parentGroupName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Parent Group Name"
                    fullWidth
                    error={!!errors.parentGroupName}
                    helperText={errors.parentGroupName?.message}
                    sx={{ flex: 1 }}
                  >
                    <MenuItem value="">
                      <em>Select Parent Group</em>
                    </MenuItem>
                    {parentGroupOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Controller
                name="groupName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Group Name"
                    fullWidth
                    error={!!errors.groupName}
                    helperText={errors.groupName?.message}
                    sx={{ flex: 1 }}
                  >
                    <MenuItem value="">
                      <em>Select Group Name</em>
                    </MenuItem>
                    {groupNameOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            pt: 2,
            borderTop: 1,
            borderColor: "grey.200",
            gap: 1,
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              color: "grey.700",
              borderColor: "grey.300",
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LocationModal;
