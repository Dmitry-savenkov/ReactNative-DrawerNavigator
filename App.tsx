import * as React from 'react';
import {
    Button,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    Text,
    TouchableOpacity,
    Animated,
    ImageSourcePropType
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home';
import SecondScreen from './components/SecondScreen';
import ThirdScreen from './components/ThirdScreen';
import FourScreen from './components/FourScreen';
import profile from './assets/profile.png';
import home from './assets/home.png';
import search from './assets/search.png';
import notifications from './assets/bell.png';
import settings from './assets/settings.png';
import logout from './assets/logout.png';
import menu from './assets/menu.png';
import close from './assets/close.png';
import photo from './assets/photo.jpg';

export default function App() {
    const [currentTab, setCurrentTab] = React.useState('Home');
    const [showMenu, setShowMenu] = React.useState(false);

    const offsetY = React.useRef(new Animated.Value(0)).current;
    const scaleValue = React.useRef(new Animated.Value(1)).current;

    const TabButton = (
        currentTab: string,
        setCurrentTab: {
            (value: React.SetStateAction<string>): void;
            (value: React.SetStateAction<string>): void;
            (value: React.SetStateAction<string>): void;
            (value: React.SetStateAction<string>): void;
            (value: React.SetStateAction<string>): void;
            (arg0: any): void;
        },
        title: {} | null | undefined,
        image: ImageSourcePropType
    ) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (title === 'Logout') {
                        // do logout
                    } else {
                        setCurrentTab(title);
                    }
                }}
            >
                <View
                    style={{
                        paddingVertical: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: currentTab === title ? 'white' : 'transparent',
                        justifyContent: 'flex-start',
                        borderRadius: 8,
                        paddingLeft: 20,
                        paddingRight: 40,
                        marginTop: 10
                    }}
                >
                    <Image
                        source={image}
                        style={{ width: 25, height: 25, tintColor: currentTab === title ? '#5359D5' : 'white' }}
                    />
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: '700',
                            paddingLeft: 15,
                            color: currentTab === title ? '#5359D5' : 'white'
                        }}
                    >
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ justifyContent: 'flex-start', padding: 20 }}>
                <Image source={profile} style={styles.avatar} />
                <Text style={styles.name}>Jenna Lurik</Text>
                <TouchableOpacity>
                    <Text style={styles.viewProfile}>View Profile</Text>
                </TouchableOpacity>
                <View style={{ flexGrow: 1, marginTop: 50 }}>
                    {TabButton(currentTab, setCurrentTab, 'Home', home)}
                    {TabButton(currentTab, setCurrentTab, 'Search', search)}
                    {TabButton(currentTab, setCurrentTab, 'Notifications', notifications)}
                    {TabButton(currentTab, setCurrentTab, 'Settings', settings)}
                </View>
                <View>{TabButton(currentTab, setCurrentTab, 'Logout', logout)}</View>
            </View>
            <Animated.View
                style={{
                    flexGrow: 1,
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    paddingHorizontal: 15,
                    paddingVertical: 20,
                    transform: [{ scale: scaleValue }, { translateX: offsetY }],
                    borderRadius: showMenu ? 15 : 0
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        Animated.timing(scaleValue, {
                            toValue: showMenu ? 1 : 0.88,
                            duration: 300,
                            useNativeDriver: true
                        }).start();
                        Animated.timing(offsetY, {
                            toValue: showMenu ? 0 : 220,
                            duration: 300,
                            useNativeDriver: true
                        }).start();
                        setShowMenu(!showMenu);
                    }}
                >
                    <Image
                        source={showMenu ? close : menu}
                        style={{ width: 20, height: 20, tintColor: 'black', marginTop: 40 }}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 30, fontWeight: '700', color: 'black', paddingTop: 20 }}>{currentTab}</Text>
                <Image source={photo} style={{ width: '100%', height: 300, borderRadius: 15, marginTop: 20 }} />
                <Text style={{ fontSize: 20, fontWeight: '700', paddingTop: 15, paddingBottom: 8 }}>Jenna Ezarik</Text>
                <Text style={{ fontSize: 16, fontWeight: '500', paddingTop: 5 }}>
                    Pisum dolor sit amet consectetur adipisicing elit. Quos autem fugiat, deleniti veritatis
                    exercitationem hic.
                </Text>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5359D5',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 20,
        marginTop: 8
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        marginTop: 20
    },
    viewProfile: {
        fontSize: 14,
        fontWeight: '400',
        color: 'white',
        marginTop: 10
    }
});
