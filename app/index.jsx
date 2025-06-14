import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { styles } from './styles';

// Header Component
const Header = () => {
  return (
    <View style={styles.topHeader}>
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.appTitle}>To Do</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Sidebar Item Component
const SidebarItem = ({ item, isCustomList = false }) => {
  return (
    <TouchableOpacity style={[styles.sidebarItem, isCustomList && styles.customList]}>
      <View style={styles.sidebarItemLeft}>
        <View style={[styles.sidebarIcon, { backgroundColor: item.color }]}>
          <Text style={styles.sidebarIconText}>{item.icon}</Text>
        </View>
        <Text style={styles.sidebarItemText}>{item.name}</Text>
      </View>
      <Text style={styles.sidebarCount}>{item.count}</Text>
    </TouchableOpacity>
  );
};

// Lists Section Component
const ListsSection = ({ customLists }) => {
  return (
    <View style={styles.listsSection}>
      <View style={styles.listsSectionHeader}>
        <Text style={styles.listsSectionTitle}>Lists</Text>
        <TouchableOpacity>
          <Text style={styles.addListButton}>+</Text>
        </TouchableOpacity>
      </View>
      
      {customLists.map((list) => (
        <SidebarItem key={list.id} item={list} isCustomList={true} />
      ))}
    </View>
  );
};

// Sidebar Component
const Sidebar = ({ sidebarLists, customLists }) => {
  return (
    <View style={styles.sidebar}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={sidebarLists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SidebarItem item={item} />}
          scrollEnabled={false}
        />
        
        <ListsSection customLists={customLists} />
      </ScrollView>
    </View>
  );
};

// List Header Component
const ListHeader = ({ title, date }) => {
  return (
    <View style={styles.listHeader}>
      <View style={styles.listTitleSection}>
        <Text style={styles.listTitle}>{title}</Text>
        <Text style={styles.listDate}>{date}</Text>
      </View>
      <TouchableOpacity style={styles.moreOptionsButton}>
        <Text style={styles.moreOptionsIcon}>⋯</Text>
      </TouchableOpacity>
    </View>
  );
};

// Suggestions Banner Component
const SuggestionsBanner = ({ message }) => {
  return (
    <View style={styles.suggestionsBanner}>
      <View style={styles.suggestionsLeft}>
        <Text style={styles.suggestionsIcon}>💡</Text>
        <Text style={styles.suggestionsText}>{message}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.suggestionsClose}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

// Add Task Input Component
const AddTaskInput = ({ placeholder = "Add a task" }) => {
  return (
    <View style={styles.addTaskContainer}>
      <TouchableOpacity style={styles.addTaskButton}>
        <Text style={styles.addTaskIcon}>+</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.addTaskInput}
        placeholder={placeholder}
        placeholderTextColor="#8a8886"
      />
    </View>
  );
};

// Task Item Component
const TaskItem = ({ task }) => {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity style={styles.taskCheckbox}>
        <View style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      
      <View style={styles.taskContent}>
        <Text style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
          {task.text}
        </Text>
      </View>
      
      <TouchableOpacity style={styles.starButton}>
        <Text style={[styles.star, task.important && styles.starImportant]}>
          ⭐
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Completed Section Component
const CompletedSection = ({ completedTasks }) => {
  if (completedTasks.length === 0) return null;

  return (
    <View style={styles.completedSection}>
      <TouchableOpacity style={styles.completedHeader}>
        <Text style={styles.completedTitle}>Completed ({completedTasks.length})</Text>
        <Text style={styles.completedToggle}>⌄</Text>
      </TouchableOpacity>
      
      <FlatList
        data={completedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
        scrollEnabled={false}
      />
    </View>
  );
};

// Tasks List Component
const TasksList = ({ pendingTasks, completedTasks }) => {
  return (
    <ScrollView style={styles.tasksContainer} showsVerticalScrollIndicator={false}>
      <FlatList
        data={pendingTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
        scrollEnabled={false}
      />
      
      <CompletedSection completedTasks={completedTasks} />
    </ScrollView>
  );
};

// Detail Option Component
const DetailOption = ({ icon, text }) => {
  return (
    <TouchableOpacity style={styles.detailOption}>
      <Text style={styles.detailIcon}>{icon}</Text>
      <Text style={styles.detailText}>{text}</Text>
    </TouchableOpacity>
  );
};

// Right Panel Component
const RightPanel = ({ selectedTask }) => {
  const detailOptions = [
    { icon: '📅', text: 'Add due date' },
    { icon: '🔔', text: 'Remind me' },
    { icon: '🔄', text: 'Repeat' },
    { icon: '📝', text: 'Add note' },
  ];

  return (
    <View style={styles.rightPanel}>
      <View style={styles.taskDetailHeader}>
        <Text style={styles.taskDetailTitle}>{selectedTask.text}</Text>
        <TouchableOpacity>
          <Text style={styles.closeDetailPanel}>×</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.taskDetailContent}>
        {detailOptions.map((option, index) => (
          <DetailOption key={index} icon={option.icon} text={option.text} />
        ))}
      </View>
      
      <View style={styles.taskDetailFooter}>
        <Text style={styles.createdDate}>Created today</Text>
      </View>
    </View>
  );
};

// Main Content Component
const MainContent = ({ currentList, tasks }) => {
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <View style={styles.mainContent}>
      <ListHeader title={currentList.name} date="Monday, June 9" />
      
      <SuggestionsBanner message="Good morning! Here are some tasks for today" />
      
      <AddTaskInput />
      
      <TasksList pendingTasks={pendingTasks} completedTasks={completedTasks} />
    </View>
  );
};

// Main App Component
const App = () => {
  // Static data for UI demonstration
  const sidebarLists = [
    { id: '1', name: 'My Day', icon: '☀️', count: 3, color: '#0078d4' },
    { id: '2', name: 'Important', icon: '⭐', count: 2, color: '#d83b01' },
    { id: '3', name: 'Planned', icon: '📅', count: 1, color: '#107c10' },
    { id: '4', name: 'All', icon: '📝', count: 8, color: '#5c2d91' },
    { id: '5', name: 'Completed', icon: '✅', count: 5, color: '#0078d4' },
    { id: '6', name: 'Tasks', icon: '🏠', count: 4, color: '#0078d4' },
  ];

  const customLists = [
    { id: '7', name: 'Work Projects', icon: '📋', count: 3, color: '#8764b8' },
    { id: '8', name: 'Personal', icon: '🏠', count: 2, color: '#00bcf2' },
  ];

  const tasks = [
    { id: '1', text: 'Review quarterly reports', completed: false, important: true, myDay: true },
    { id: '2', text: 'Call client about project update', completed: false, important: false, myDay: true },
    { id: '3', text: 'Prepare presentation slides', completed: false, important: true, myDay: true },
    { id: '4', text: 'Team meeting at 3 PM', completed: false, important: false, myDay: false },
    { id: '5', text: 'Update project documentation', completed: true, important: false, myDay: false },
    { id: '6', text: 'Send weekly status report', completed: true, important: false, myDay: false },
  ];

  const currentList = sidebarLists[0]; // My Day
  const selectedTask = tasks[0]; // First task for detail panel

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0078d4" />
      
      <Header />

      <View style={styles.mainContainer}>
        <Sidebar sidebarLists={sidebarLists} customLists={customLists} />
        
        <MainContent currentList={currentList} tasks={tasks} />
        
        <RightPanel selectedTask={selectedTask} />
      </View>
    </SafeAreaView>
  );
};

export default App;