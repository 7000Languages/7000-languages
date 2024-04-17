import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header:  {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        borderBottomColor: '#DEE5E9',
        borderBottomWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    myCourses: {
        fontWeight: 'bold',
        color: '#1C1C1C',
        fontSize: 16
    },
    learnerContainer: {
        maxWidth: 120,
        backgroundColor: '#DEE5E9',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        marginBottom: 10,
        padding: 8
    },
    learnerText: {
        color: '#496277',
        fontWeight: 'bold',
        fontSize: 12,
    },
    learnerQuestion: {
        color: '#1C1C1C',
        fontSize: 12,
        lineHeight: 16
    },
    questionContainer: {
        width: '90%',
        height: 109,
        backgroundColor: '#F9F9F9',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12
    },
    searchCourseBtn: {
        width: '95%',
        height: 33,
        backgroundColor: '#496277',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    searchCourseText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 12,
    },
    contrubutorContainer: {
        marginTop: 30,
        width: 107,
        height: 28,
        backgroundColor: '#FBEAE9',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        marginBottom: 10
    },
    contributorText: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        fontSize: 12,
    },
    accountInfBtn: {
        width: '85%',
        height: 44,
        backgroundColor: '#DEE5E9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    accountInfText: {
        color:'#5B6165',
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 14,
    },
    applyNowBtn: {
        width: '95%',
        height: 33,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    applyContainer: {
        width: '90%',
        height: 124,
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12
    }
});

export default styles;