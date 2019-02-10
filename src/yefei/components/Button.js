import { Row, Col,Card,List,Modal,Button } from 'antd'
import React, { Component } from 'react';
import axios from "axios"
import './Top.css';

class Test extends Component {
    constructor(props){
        super(props)
        this.state={visible:false,novels:[],chapters:[],currChapter:{}}
    }
    componentDidMount() {
        axios.get('/api/bookList').then(res=>{
            this.setState({novels:res.data.data});
        })

    }

    handleCancel = (e) => {
        this.setState({visible:false})
    }

    handleNext=()=>{
        let index=this.state.currChapter.index+1
        let currChapter=this.state.chapters[index]
        currChapter.index=index
        axios.get('/api/chapterDetail?chapterId='+currChapter.id).then(res=>{
            currChapter.detail=res.data.data.content
            this.setState({currChapter:currChapter})
        })
    }

    handlePrev=()=>{
        let i=1
        let index=this.state.currChapter.index-1
        let currChapter=this.state.chapters[index]
        currChapter.index=index
        axios.get('/api/chapterDetail?chapterId='+currChapter.id).then(res=>{
            currChapter.detail=res.data.data.content
            this.setState({currChapter:currChapter})
        })
    }

    novelClicked(novelId){
        axios.get('/api/chapterList?novelId='+novelId).then(res=>{
            for(let i=0;i<res.data.data.chapters.length;i++){
                res.data.data.chapters[i].index=i;
            }
            this.setState({chapters:res.data.data.chapters});
        })
    }
    chapterClicked(chapterIndex){
        let currChapter=this.state.chapters[chapterIndex]
        currChapter.index=chapterIndex
        axios.get('/api/chapterDetail?chapterId='+currChapter.id).then(res=>{
            currChapter.detail=res.data.data.content
            this.setState({currChapter:currChapter})
            this.setState({visible:true});
        })
    }
    render() {
        return (
            <div>
                <Row>
                <Col span={6}>
                    <List
                    size="large"
                    style={{ width: '90%' ,marginLeft:'5%',marginTop:20}}
                    header={<h2>Novels</h2>}
                    bordered
                    dataSource={this.state.novels}
                    renderItem={novel => (<List.Item onClick={this.novelClicked.bind(this,novel.id)}><p>{novel.name}</p></List.Item>)}
                    />
                </Col>
                <Col span={18}>
                    <List
                        style={{ width: '99%' ,marginRight:'0.5%',marginTop:20}}
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={this.state.chapters}
                        renderItem={item => (
                        <List.Item onClick={this.chapterClicked.bind(this,item.index)}>
                            <Card>{item.title}</Card>
                        </List.Item>
                        )}
                    />
                </Col>
                </Row>
                <Modal
                    width={800}
                    style={{ top: 20 }}
                    title={this.state.currChapter.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="next"
                    cancelText="prev"
                    okType="default"
                    footer={<div><Button onClick={this.handlePrev}>prev</Button><Button onClick={this.handleNext}>next</Button></div>}
                    >
                    <p>{this.state.currChapter.detail}</p>
                </Modal>
            </div>
            
        )
    }
}

export default Test



