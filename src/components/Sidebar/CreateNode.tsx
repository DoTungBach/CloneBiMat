import {
  Box,
  VStack,
  IconButton,
  Text,
  Icon,
  Flex,
  Grid,
} from "@chakra-ui/react";

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

import { useContext, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AppContext } from "../../store/AppContext";

const MotionBox = motion(Box);

export const BotStudioConcepts = [
  {
    node_type: "sayMessageNode",
    node_name: "Say Message",
    node_color: "blue.400",
    node_icon: FaCommentDots,
    node_detail_vn:
      "Cấu hình lời thoại cần Bot nói dưới dạng văn bản, hệ thống sử dụng công nghệ Text To Speech để tự động chuyển đổi thành giọng nói. Hoặc có thể tải lên file ghi âm để Bot có thể phát thoại theo",
  },
  {
    node_type: "listenNode",
    node_name: "Listen",
    node_color: "green.400",
    node_icon: FaBrain,
    node_detail_vn: "Chờ cập nhập...",
  },

  {
    node_type: "setVariableNode",
    node_name: "Set Variable",
    node_color: "orange.400",
    node_icon: FaCog,
    node_detail_vn: "Chờ cập nhập...",
  },

  {
    node_type: "splitBaseOnNode",
    node_name: "Split Base On",
    node_color: "red.400",
    node_icon: FaCodeBranch,
    node_detail_vn: "Chờ cập nhập...",
  },

  {
    node_type: "checkPointNode",
    node_name: "Checkpoint",
    node_color: "purple.400",
    node_icon: FaMapMarkerAlt,
    node_detail_vn: "Chờ cập nhập...",
  },

  {
    node_type: "httpApiNode",
    node_name: "HTTP API",
    node_color: "yellow.400",
    node_icon: FaCode,
    node_detail_vn: "Chờ cập nhập...",
  },

  {
    node_type: "forwardCallNode",
    node_name: "Foward Call",
    node_color: "gray.600",
    node_icon: FaPhoneAlt,
    node_detail_vn: "Chờ cập nhập...",
  },

  {
    node_type: "shortcutNode",
    node_name: "Shortcut",
    node_color: "gray.400",
    node_icon: FaArrowRight,
    node_detail_vn: "Chờ cập nhập...",
  },

  {
    node_type: "scenarioEndNode",
    node_name: "End Call",
    node_color: "gray.600",
    node_icon: FaPhoneSlash,
    node_detail_vn: "Chờ cập nhập...",
  },
];

function CreateNode() {
  const [isOpen, setIsOpen] = useState(false);
  const [nodes, setNodes] = useState(BotStudioConcepts);

  const { setType } = useContext(AppContext);

  const onDragStart = (event: any, nodeType: any) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleOnFlowsDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(nodes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setNodes(items);
    const default_order = [];
    for (const node of items) {
      default_order.push(node.node_type);
    }
    localStorage.setItem("node_order", JSON.stringify(default_order));
  };

  return (
    <MotionBox
      bg="gray.100"
      w={isOpen ? "200px" : "50px"}
      p={2}
      overflow="hidden"
      borderRadius="md"
      boxShadow="lg"
      initial={{ width: "50px" }}
      animate={{ width: isOpen ? "200px" : "50px" }}
      transition={{ duration: 0.3 }}
      position="absolute"
      top="50%"
      transform={"translateY(-50%)"}
      left={5}
      zIndex={100}
    >
      <VStack align="start">
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isOpen ? <FaChevronLeft /> : <FaChevronRight />}
          onClick={toggleSidebar}
          mb={4}
          colorScheme="teal"
          size="md"
        />
        <DragDropContext onDragEnd={handleOnFlowsDragEnd}>
          <Droppable droppableId="create_node">
            {(provided) => (
              <Grid {...provided.droppableProps} ref={provided.innerRef}>
                {nodes.map((item, index) => (
                  <Draggable
                    key={item.node_type}
                    draggableId={item.node_type}
                    index={index}
                  >
                    {(provided) => (
                      <MotionBox
                        key={item.node_type}
                        bg={item.node_color}
                        w="100%"
                        p={2}
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        mb={2}
                        h={35}
                        draggable
                        onDragStart={(event) =>
                          onDragStart(event, item.node_type)
                        }
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <Flex
                          align="center"
                          justify={isOpen ? "flex-start" : "center"}
                        >
                          <Icon
                            as={item.node_icon}
                            ml={"1px"}
                            w="100%"
                            boxSize={4}
                            color="white"
                          />
                          {isOpen && (
                            <Text
                              ml={4}
                              fontWeight="medium"
                              color="white"
                              whiteSpace="nowrap"
                            >
                              {item.node_name}
                            </Text>
                          )}
                        </Flex>
                      </MotionBox>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </VStack>
    </MotionBox>
  );
}

export default CreateNode;
