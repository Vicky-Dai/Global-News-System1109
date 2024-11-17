import { convertMoment, PageHeader } from '@ant-design/pro-components'
import { Button, Descriptions } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment'


export default function NewsPreview(props) {
  const { id } = useParams();
  const [newsInfo, setnewsInfo] = useState(null)

  useEffect(()=>{
    // console.log("NewsPreview组件挂载")
    console.log("props", id)
    axios.get(`http://localhost:5000/news/${id}?_embed=category&_embed=role`).then(res=>{
      console.log("res.data", res.data)
      setnewsInfo(res.data)
    })
    return ()=>{
      // console.log("NewsPreview组件卸载")
    }
  },[id])

  const auditList = ["未审核", "审核中", "已通过", "未通过"]
  const publishList = ["未发布", "待发布", "已上线", "已下线"]

  return (
    <div>
        {
          newsInfo && <div> {/* axios异步调用，所以先判断useEffect有没有吧newsInfo拿回来（初始化为0），拿回来之后再渲染 */}
            <PageHeader
              // ghost={false}
              onBack={() => window.history.back()}
              title={newsInfo.title} /* 初始值是null，所以不加问号会报错 */
              subTitle={newsInfo.category.title}
            >
              <Descriptions size="small" column={3}>
                <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss")}</Descriptions.Item>  {/* moment时间转换的用法 */}
                <Descriptions.Item label="发布时间">{newsInfo.publishTime?moment(newsInfo.publishTime):"-"}</Descriptions.Item>
                <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                <Descriptions.Item label="审核状态" ><span style={{color:"red"}}>{auditList[newsInfo.auditState]}</span></Descriptions.Item>
                <Descriptions.Item label="发布状态"><span style={{color:"red"}}>{publishList[newsInfo.publishState]}</span></Descriptions.Item>
                <Descriptions.Item label="访问数量">{newsInfo.view}</Descriptions.Item>
                <Descriptions.Item label="点赞数量">{newsInfo.star}</Descriptions.Item>
                <Descriptions.Item label="评论数量">0</Descriptions.Item>
                
              </Descriptions>
            </PageHeader>
            <div dangerouslySetInnerHTML={{ /* 从后端返回来的数据默认情况是不进行html转换的 */
              __html: newsInfo.content
            }}
            style ={{
              margin:"0 24px",
              border:"1px solid gray"}}
            >
              
            </div>
          </div>
        }
    </div>
  )
}
