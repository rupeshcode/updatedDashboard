import React from "react";
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

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: "white",
          border: "2px solid #333",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
          margin: "20px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: "20px",
            borderBottom: "2px solid #333",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Change Location
          </h2>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "2px solid #333",
              borderRadius: "4px",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div style={{ padding: "24px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: 1 }}>
                  <Controller
                    name="plant"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#333",
                          }}
                        >
                          Plant
                        </label>
                        <select
                          {...field}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `2px solid ${
                              errors.plant ? "#ff0000" : "#333"
                            }`,
                            borderRadius: "4px",
                            fontSize: "14px",
                            backgroundColor: "white",
                          }}
                        >
                          <option value="">Select Plant</option>
                          {plantOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.plant && (
                          <div
                            style={{
                              color: "#ff0000",
                              fontSize: "12px",
                              marginTop: "4px",
                            }}
                          >
                            {errors.plant.message}
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <Controller
                    name="area"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#333",
                          }}
                        >
                          Area
                        </label>
                        <select
                          {...field}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `2px solid ${
                              errors.area ? "#ff0000" : "#333"
                            }`,
                            borderRadius: "4px",
                            fontSize: "14px",
                            backgroundColor: "white",
                          }}
                        >
                          <option value="">Select Area</option>
                          {areaOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.area && (
                          <div
                            style={{
                              color: "#ff0000",
                              fontSize: "12px",
                              marginTop: "4px",
                            }}
                          >
                            {errors.area.message}
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: 1 }}>
                  <Controller
                    name="parentGroupName"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#333",
                          }}
                        >
                          Parent Group Name
                        </label>
                        <select
                          {...field}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `2px solid ${
                              errors.parentGroupName ? "#ff0000" : "#333"
                            }`,
                            borderRadius: "4px",
                            fontSize: "14px",
                            backgroundColor: "white",
                          }}
                        >
                          <option value="">Select Parent Group</option>
                          {parentGroupOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.parentGroupName && (
                          <div
                            style={{
                              color: "#ff0000",
                              fontSize: "12px",
                              marginTop: "4px",
                            }}
                          >
                            {errors.parentGroupName.message}
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <Controller
                    name="groupName"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#333",
                          }}
                        >
                          Group Name
                        </label>
                        <select
                          {...field}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: `2px solid ${
                              errors.groupName ? "#ff0000" : "#333"
                            }`,
                            borderRadius: "4px",
                            fontSize: "14px",
                            backgroundColor: "white",
                          }}
                        >
                          <option value="">Select Group Name</option>
                          {groupNameOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.groupName && (
                          <div
                            style={{
                              color: "#ff0000",
                              fontSize: "12px",
                              marginTop: "4px",
                            }}
                          >
                            {errors.groupName.message}
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "2px solid #333",
              padding: "20px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            <button
              type="button"
              onClick={handleClose}
              style={{
                padding: "12px 24px",
                border: "2px solid #333",
                borderRadius: "4px",
                backgroundColor: "white",
                color: "#333",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "12px 24px",
                border: "2px solid #333",
                borderRadius: "4px",
                backgroundColor: "#333",
                color: "white",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                opacity: isSubmitting ? 0.6 : 1,
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationModal;
