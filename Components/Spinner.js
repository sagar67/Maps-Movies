import SpinnerOverlay from 'react-native-loading-spinner-overlay'

export const Spinner = ({loading}) => {
    if(loading){
        return(
            <SpinnerOverlay
                animation='slide'
                visible={loading}
                color='yellow'
            />
        )
    }
}