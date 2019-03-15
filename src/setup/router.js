import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";

// Import screens
import LoginScreen from "../screens/login-screen/loginScreen";
import SignupScreen from "../screens/signup-screen/signupScreen";
import LoadingScreen from "../screens/loading-screen/loadingScreen";
import HomeScreen from "../screens/home-screen/homeScreen";
import AddTaskScreen from "../screens/add-task-screen/addTaskScreen";
import AddCategoryScreen from "../screens/add-category-screen/addCategoryScreen";

// Import Component
import SideBar from "../components/drawer-sidebar/drawerSidebar";

// Initialising screen stacks
const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Signup: {
      screen: SignupScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    AddTask: {
      screen: AddTaskScreen
    },
    AddCategory: {
      screen: AddCategoryScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

// Initialising drawer routes
const DrawerRouter = createDrawerNavigator(
  {
    DrawerOpen: AppStack
  },
  {
    contentComponent: SideBar
  }
);

// Create app container
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: LoadingScreen,
      Routors: DrawerRouter,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
