var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const { LAYOUT, COLOR } = require("../constants");
const merge_extradata_1 = __importDefault(require("./merge-extradata"));
const isAndroidRTL = react_native_1.I18nManager.isRTL && react_native_1.Platform.OS === 'android';
class AppIntroSlider extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            width: 0,
            height: 0,
            activeIndex: 0,
        };
        this.goToSlide = (pageNum, triggerOnSlideChange) => {
            const prevNum = this.state.activeIndex;
            this.setState({ activeIndex: pageNum });
            this.flatList?.scrollToOffset({
                offset: this._rtlSafeIndex(pageNum) * this.state.width,
            });
            if (triggerOnSlideChange && this.props.onSlideChange) {
                this.props.onSlideChange(pageNum, prevNum);
            }
        };
        this.getListRef = () => this.flatList;
        this._rtlSafeIndex = (i) => isAndroidRTL ? this.props.data.length - 1 - i : i;
        this._renderItem = (flatListArgs) => {
            const { width, height } = this.state;
            const props = { ...flatListArgs, dimensions: { width, height } };
            return <react_native_1.View style={{ width, flex: 1 }}>{this.props.renderItem(props)}</react_native_1.View>;
        };
        this._renderButton = (name, label, onPress, render) => {
            const content = render ? render() : this._renderDefaultButton(name, label);
            return this._renderOuterButton(content, name, onPress);
        };
        this._renderDefaultButton = (name, label) => {
            let content = 
                <react_native_1.Text style={styles.buttonText}>{label}</react_native_1.Text>;
                    if (this.props.bottomButton) {
                        content = (<react_native_1.View style={[
                            name === 'Skip' || name === 'Prev'
                                ? styles.transparentBottomButton
                                : styles.bottomButton,
                        ]}>
                        {content}
                </react_native_1.View>);
            }
            return content;
        };
        this._renderOuterButton = (content, name, onPress) => {
            const style = name === 'Skip' || name === 'Prev'
                ? styles.leftButtonContainer
                : styles.rightButtonContainer;
            return (
                <react_native_1.View style={!this.props.bottomButton && style}>
                    <react_native_1.TouchableOpacity onPress={onPress} style={this.props.bottomButton && styles.flexOne}>
                    {content}
                    
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>
            );
        };
        this._renderNextButton = () => this.props.showNextButton && this._renderButton('Next', this.props.nextLabel, () => this.goToSlide(this.state.activeIndex + 1, true), this.props.renderNextButton);
        this._renderPrevButton = () => this.props.showPrevButton && this._renderButton('Prev', this.props.prevLabel, () => this.goToSlide(this.state.activeIndex - 1, true), this.props.renderPrevButton);
        this._renderDoneButton = () => this.props.showDoneButton && this._renderButton('Done', this.props.doneLabel, this.props.onDone, this.props.renderDoneButton);
        this._renderSkipButton = () => this.props.showSkipButton && this._renderButton('Skip', this.props.skipLabel, () => this.props.onSkip ? this.props.onSkip() : this.goToSlide(this.props.data.length - 1), this.props.renderSkipButton);
        this._renderPagination = () => {
            return (
                <react_native_1.View style={styles.paginationContainer}>
                    <react_native_1.SafeAreaView>
                    <react_native_1.View style={styles.paginationDots}>
                        {this.props.data.length > 1 &&
                            this.props.data.map((_, i) => this.props.dotClickEnabled ? (<react_native_1.TouchableOpacity key={i} style={[
                                styles.dot,
                                this._rtlSafeIndex(i) === this.state.activeIndex
                                    ? this.props.activeDotStyle
                                    : this.props.dotStyle,
                            ]} onPress={() => this.goToSlide(i, true)}/>) : (<react_native_1.View key={i} style={[
                                styles.dot,
                                this._rtlSafeIndex(i) === this.state.activeIndex
                                    ? this.props.activeDotStyle
                                    : this.props.dotStyle,
                            ]}/>))}
                    </react_native_1.View>
                    </react_native_1.SafeAreaView>
                    <react_native_1.TouchableOpacity style={styles.policyButton} onPress={()=>this.props.navigate()}>
                        <react_native_1.Text style={styles.policyButtonText}>Privacy Policy</react_native_1.Text>
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>
            );
        };
        this._onMomentumScrollEnd = (e) => {
            const offset = e.nativeEvent.contentOffset.x;
            const newIndex = this._rtlSafeIndex(Math.round(offset / this.state.width));
            if (newIndex === this.state.activeIndex) {
                return;
            }
            const lastIndex = this.state.activeIndex;
            this.setState({ activeIndex: newIndex });
            this.props.onSlideChange && this.props.onSlideChange(newIndex, lastIndex);
        };
        this._onLayout = ({ nativeEvent }) => {
            const { width, height } = nativeEvent.layout;
            if (width !== this.state.width || height !== this.state.height) {
                this.setState({ width, height });
                const func = () => {
                    this.flatList?.scrollToOffset({
                        offset: this._rtlSafeIndex(this.state.activeIndex) * width,
                        animated: false,
                    });
                };
            }
        };
    }
    render() {
        const { renderPagination, activeDotStyle, dotStyle, skipLabel, doneLabel, nextLabel, prevLabel, renderItem, data, extraData,navigate, ...otherProps } = this.props;
        const extra = merge_extradata_1.default(extraData, this.state.width);
        const isFirstSlide = this.state.activeIndex === 0;
        const isLastSlide = this.state.activeIndex === this.props.data.length - 1;
        const primaryButton = isLastSlide ? this._renderDoneButton() : this._renderNextButton();
        const secondaryButton = (!isFirstSlide && this._renderPrevButton()) || (!isLastSlide && this._renderSkipButton());
        return (
            <react_native_1.View style={styles.flexOne}>
                <react_native_1.FlatList 
                    horizontal 
                    pagingEnabled 
                    bounces={false} 
                    data={this.props.data} 
                    style={styles.flatList} 
                    extraData={extra} 
                    onLayout={this._onLayout} 
                    renderItem={this._renderItem} 
                    keyExtractor = { (item, index) => index.toString() }
                    initialNumToRender={data.length} 
                    ref={(ref) => (this.flatList = ref)} 
                    showsHorizontalScrollIndicator={false} 
                    onMomentumScrollEnd={this._onMomentumScrollEnd} 
                    {...otherProps}
                />
                    {primaryButton}
                    {secondaryButton}
                    {renderPagination ? renderPagination(this.state.activeIndex) : this._renderPagination()}
            </react_native_1.View>
        );
    }
}
exports.default = AppIntroSlider;
AppIntroSlider.defaultProps = {
    activeDotStyle: {
        backgroundColor: 'rgba(255, 255, 255, .9)',
    },
    dotStyle: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
    },
    dotClickEnabled: true,
    skipLabel: 'Skip',
    doneLabel: 'Done',
    nextLabel: 'Next',
    prevLabel: 'Back',
    showDoneButton: true,
    showNextButton: true,
    showPrevButton: false,
    showSkipButton: false,
    bottomButton: false,
};
const styles = react_native_1.StyleSheet.create({
    flexOne: {
        flex: 1,
    },
    flatList: {
        flex: 1,
        flexDirection: isAndroidRTL ? 'row-reverse' : 'row',
    },
    paginationContainer: {
        position: 'absolute',
        bottom: LAYOUT.window.height*0.15,
        left: 16,
        right: 16,
        justifyContent: 'center',
    },
    paginationDots: {
        height: 16,
        margin: 16,
        flexDirection: isAndroidRTL ? 'row-reverse' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
    leftButtonContainer: {
        position: 'absolute',
        right: 0,
    },
    rightButtonContainer: {
        position: 'absolute',
        right: 0,
    },
    bottomButton: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    transparentBottomButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        marginTop:LAYOUT.window.height*0.01,
        color: 'white',
        fontSize:LAYOUT.fontSize7, 
        padding: LAYOUT.window.width*0.08,
    },
    policyButton:{
        position:'absolute', 
        bottom:-LAYOUT.window.height*0.05,
        width:'100%'
    },
    policyButtonText:{
        color:COLOR.whiteColor, 
        fontSize:LAYOUT.fontSize2, 
        textAlign:'center',
        textDecorationLine:'underline', 
    },
});
