import React from "react";
import { Typography, Stepper, Step, StepLabel, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { keyframes } from "@emotion/react";

const pulse = keyframes`
	0% {
		transform: scale(1);
		opacity: 1;
	}
	50% {
		transform: scale(1.1);
		opacity: 0.7;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
`;

const rotate = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

const gradientAnimation = keyframes`
	0% { background-position: 0% 50%; }
	50% { background-position: 100% 50%; }
	100% { background-position: 0% 50%; }
`;

const steps = [
  {
    label: "Search for Items",
    description: "Browse through the list of found items.",
    icon: (
      <SearchIcon sx={{ color: "white", animation: `${pulse} 2s infinite` }} />
    ),
  },
  {
    label: "Add Found Item",
    description: "Report item which you found in campus.",
    icon: (
      <AddIcon sx={{ color: "white", animation: `${pulse} 2s infinite` }} />
    ),
  },
  {
    label: "Claim Your Item",
    description: "If you find your lost item, claim it.",
    icon: (
      <AssignmentTurnedInIcon
        sx={{
          color: "white",
          animation: `${rotate} 5s linear infinite`,
        }}
      />
    ),
  },
];

/**
 * StepperComponent is a React component that renders a stepper with three steps.
 * Each step has a label, description, and an animated icon.
 *
 * @component
 * @returns {JSX.Element} The rendered StepperComponent.
 */
function StepperComponent() {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        background:
          "linear-gradient(45deg, #FE6B8B, #FF8E53, #8ED1FC, #0693E3, #00D084)",
        backgroundSize: "400% 400%",
        animation: `${gradientAnimation} 15s ease infinite`,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ color: "white", fontWeight: "bold" }}
      >
        Lost it? Look No Further!
      </Typography>
      <Stepper activeStep={-1} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel icon={step.icon}>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {step.label}
              </Typography>
              <Typography variant="body2" sx={{ color: "white" }}>
                {step.description}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
}

export default StepperComponent;
