/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableHighlight, Image, AsyncStorage, Alert } from 'react-native';
import {
	Container,
	Header,
	Item,
	Icon,
	Input,
	Button,
	Content,
	List,
	ListItem,
	Thumbnail,
	Text
} from 'native-base';
import Swiper from 'react-native-swiper';
import Realm from 'realm';

import Detail from './detail';


const circleSize = 8;
const circleMargin = 5;

const SERVER_URL = 'http://localhost:3000/';
const PRODUCT_API = 'products/';

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isNetworkValid: false,
			searchText: '',
			products: [],
			advertisements: [
				{
					image: require('./images/advertisement-image-01.jpg')
				},
				{
					image: require('./images/advertisement-image-02.jpg')
				},
				{
					image: require('./images/advertisement-image-03.jpg')
				}
			],

			realm: new Realm({
				schema: [{
					name: 'Product',
					properties: {
						id: 'int',
						title: 'string',
						subTitle: 'string',
						image: 'string'
					}
				}]
			})

		};
	}


	render() {
		return (
			<Container>
				<Header searchBar rounded>
					<Item>
						<Icon name='ios-search-outline' />
						<Input placeholder='搜索商品' onChangeText={(text) => {
							this.setState({ searchText: text });
							console.log('输入的内容是 ' + this.state.searchText);
						}} />
					</Item>
					<Button transparent onPress={() => {
						Alert.alert('搜索内容 ' + this.state.searchText, null, null);
					}}>
						<Text>搜索</Text>
					</Button>
				</Header>

				<Content>

					<Swiper loop={true} height={190} autoplay={true} >
						{this.state.advertisements.map((advertisement, index) => {
							return (
								<TouchableHighlight key={index} onPress={() => Alert.alert('你点击了轮播图', null, null)}>
									<Image style={styles.advertisementContent} source={advertisement.image} aut></Image>
								</TouchableHighlight>
							);
						})}
					</Swiper>
					<List dataArray={this.state.products}>

						{this.state.products.map((product, index) => {

							const ImageComponent = this.state.isNetworkValid ? <Thumbnail square size={40} source={
								{
									uri: SERVER_URL + product.image
								}
							} /> : <Thumbnail square size={40} source={
								{
									uri: './images/product-image-01.jpg'
								}
							} />;

							return (
								<ListItem key={index} button onPress={() => {
									const { navigator } = this.props;
									if (navigator) {
										navigator.push({
											name: 'detail',
											component: Detail,
											params: {
												product: product,
												productUpdated: this._productUpdated

											}
										});
									}
								}}>
									{ImageComponent}
									<Text>{product.title}</Text>
									<Text note>{product.subTitle}</Text>
								</ListItem>
							);
						})}
					</List>

					{/* <List dataArray={this.state.products} renderRow={this._renderRow} ></List> */}


				</Content>
			</Container>
		);
	}


	componentDidMount() {
		this._fetchProducts();
	}


	_saveProducts = (products) => {
		this.state.realm.write(() => {
			for (const i = 0; i < products.count; i++) {
				const product = products[i];
				this.state.realm.create('Product', {
					id: parseInt(product.id),
					title: product.title,
					subTitle: product.subTitle,
					image: product.image
				});
			}
		});
	}

	_queryProducts = () => {
		return this.state.realm.objects('Product');
	}

	_productUpdated = () => {
		this._fetchProducts();
	}

	_fetchProducts = () => {
		const req = new Request(SERVER_URL + PRODUCT_API, { method: 'GET' });
		console.log('request: ', SERVER_URL + PRODUCT_API);
		fetch(req).then((res) => {
			return res.json(); // 将返回的数据转换成JSON格式
		}).then((result, done) => {
			if (!done) {
				// AsyncStorage.setItem('products',JSON.stringify(result)).then((error)=>{
				// 	if(error)
				// 	{
				// 		Alert.alert('err: ' +err,null,null);
				// 	}
				// 	this.setState({
				// 		isNetworkValid:true,
				// 		products:result
				// 	});
				// });

				console.log('result: ' + JSON.stringify(result));

				this._saveProducts(result);
				this.setState({isNetworkValid: true, products: result});
			}
		}).catch((err) => { // Promise异常处理
			// AsyncStorage.getItem('products').then((values)=>{
			// 	this.setState({
			// 		isNetworkValid:false,
			// 		products:JSON.parse(values)
			// 	});
			// });


			const products = this._queryProducts();
			console.log('products: ' + JSON.stringify(products));
			this.setState({ isNetworkValid: false, products: products });
		});
	}


	_renderRow = (product) => {

		return (
			<ListItem button onPress={() => {
				const { navigator } = this.props;
				if (navigator) {
					navigator.push({
						name: 'detail',
						component: Detail,
						params: {
							producTitle: product.title,
						}
					});
				}
			}}>
				<Thumbnail square size={40} source={
					{
						uri: SERVER_URL + product.image
					}
				} />
				<Text>{product.title}</Text>
				<Text note>{product.subTitle}</Text>
			</ListItem>
		);
	}

}


const styles = StyleSheet.create({
	advertisementContent: {
		width: Dimensions.get('window').width,
		height: 180,
	}
});
