import { Box, VStack, IconButton, Text, Icon, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaChevronRight,
  FaChevronLeft,
  FaCommentDots,
  FaBrain,
  FaCog,
  FaCodeBranch,
  FaMapMarkerAlt,
  FaCode,
  FaPhoneAlt,
  FaArrowRight,
  FaPhoneSlash,
} from "react-icons/fa";
import { useState } from "react";
const MotionBox = motion(Box);

function CreateNode() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MotionBox
      bg="gray.100"
      w={isOpen ? "200px" : "60px"}
      h="100%"
      p={2}
      overflow="hidden"
      borderRadius="md"
      boxShadow="lg"
      initial={{ width: "60px" }}
      animate={{ width: isOpen ? "200px" : "60px" }}
      transition={{ duration: 0.3 }}
      zIndex={5}
      position="absolute"
      left={10}
      top="10%"
    >
      <VStack align="start">
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isOpen ? <FaChevronLeft /> : <FaChevronRight />}
          onClick={toggleSidebar}
          mb={4}
          colorScheme="teal"
          size="lg"
        />

        {/* Menu Items */}
        {[
          { icon: FaCommentDots, label: "Say Message", color: "blue.500" },
          { icon: FaBrain, label: "Listen", color: "green.500" },
          { icon: FaCog, label: "Set Variable", color: "orange.500" },
          { icon: FaCodeBranch, label: "Split Base On", color: "red.500" },
          { icon: FaMapMarkerAlt, label: "Checkpoint", color: "purple.500" },
          { icon: FaCode, label: "HTTP API", color: "yellow.500" },
          { icon: FaPhoneAlt, label: "Forward Call", color: "gray.600" },
          { icon: FaArrowRight, label: "Shortcut", color: "gray.400" },
          { icon: FaPhoneSlash, label: "End Call", color: "gray.600" },
        ].map((item, index) => (
          <MotionBox
            key={index}
            bg={item.color}
            w="100%"
            p={2}
            borderRadius="md"
            display="flex"
            alignItems="center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            mb={2}
            cursor="pointer"
          >
            <Flex
              align="center"
              cursor="pointer"
              justify={isOpen ? "flex-start" : "center"}
            >
              <Icon as={item.icon} boxSize={6} color="white" />
              {isOpen && (
                <Text
                  ml={4}
                  fontWeight="medium"
                  color="white"
                  whiteSpace="nowrap"
                >
                  {item.label}
                </Text>
              )}
            </Flex>
          </MotionBox>
        ))}
      </VStack>
    </MotionBox>
  );
}

export default CreateNode;
