import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        products: [
            {
                "_id": "1",
                "title": "Nike Shoes 01",
                "src": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d706b6dd-32a7-4ed9-81c9-c0808624807c/dunk-low-retro-mens-shoes-9k2Xt6.png",
                "description": "Leather and synthetic",
                "content": "The Nike Blazer Mid '77 Vintage harnesses the old-school look of Nike Basketball with a vintage midsole finish, making it look like you've been saving them for years.",
                "price": 23,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "2",
                "title": "Nike Shoes 02",
                "src": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/774e0af9-109b-46a6-83c1-1c6c85d63609/tech-hera-mens-shoes-kd77nb.png",
                "description": "Leather and synthetic",
                "content": "The Nike Blazer Mid '77 Vintage harnesses the old-school look of Nike Basketball with a vintage midsole finish, making it look like you've been saving them for years.",
                "price": 19,
                "colors": ["red", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "Nike Shoes 03",
                "src": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ce901ca6-5cb0-45f0-980e-3d80b8ced632/free-metcon-5-womens-training-shoes-h4Zl5h.png",
                "description": "Leather and synthetic",
                "content": "The Nike Blazer Mid '77 Vintage harnesses the old-school look of Nike Basketball with a vintage midsole finish, making it look like you've been saving them for years.",
                "price": 50,
                "colors": ["lightblue", "white", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "Nike Shoes 04",
                "src": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/31ff59e2-89d0-4a83-839a-656618674782/air-jordan-1-mid-mens-shoes-tXSJ73.png",
                "description": "Leather and synthetic",
                "content": "The Nike Blazer Mid '77 Vintage harnesses the old-school look of Nike Basketball with a vintage midsole finish, making it look like you've been saving them for years.",
                "price": 15,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "Nike Shoes 05",
                "src": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/732b931c-f0d5-4726-ae9a-835a11753aa7/dunk-low-lx-womens-shoes-kPGHX0.png",
                "description": "Leather and synthetic",
                "content": "The Nike Blazer Mid '77 Vintage harnesses the old-school look of Nike Basketball with a vintage midsole finish, making it look like you've been saving them for years.",
                "price": 10,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "6",
                "title": "Nike Shoes 06",
                "src": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b4c65d3d-bdf9-42a6-adc7-961e7be19694/dunk-low-womens-shoes-kPGHX0.png",
                "description": "Leather and synthetic",
                "content": "The Nike Blazer Mid '77 Vintage harnesses the old-school look of Nike Basketball with a vintage midsole finish, making it look like you've been saving them for years.",
                "price": 17,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            }
        ],
        cart: [],
        total: 0
        
    };

    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check){
            const data = products.filter(product =>{
                return product._id === id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("The product has been added to cart.")
        }
    };

    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
       
    };

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };
    
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }
   

    render() {
        const {products, cart,total} = this.state;
        const {addCart,reduction,increase,removeProduct,getTotal} = this;
        return (
            <DataContext.Provider 
            value={{products, addCart, cart, reduction,increase,removeProduct,total,getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}