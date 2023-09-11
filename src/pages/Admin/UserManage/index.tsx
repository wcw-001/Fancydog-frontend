import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import  {useRef} from 'react';

import {Button, Image, message, Popconfirm, Tag} from "antd";
import {deleteUser, searchUsers} from "@/services/ant-design-pro/api";




export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};


const columns: ProColumns<API.CurrentUser>[] = [
  { title: '序号',
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
  },
  {
    title: '用户账户',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={50}/>
      </div>
    ),
    copyable: true,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      0: { text: <Tag color="success">男</Tag> },
      1: { text: <Tag color="error">女</Tag> },
  }
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '邮件',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    valueEnum: {
        0: {text: <Tag color={'success'}>正常</Tag>},
        1: {text: <Tag color={'red'}>注销</Tag>},
        2: {text: <Tag color={'Error'}>封号</Tag>},
      }
  },
  {
    title: '编号',
    dataIndex: 'userCode',
  },

  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '普通用户'.repeat(1),
        status: 'default',
      },
      1: {
        text: '管理员',
        status: 'Success',
      },

    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'date',
  },
  /*{
    title: '删除',

  },*/


/*  {
    disable: true,
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: '标签',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },*/
 /* {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },*/

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
    <Popconfirm    title="删除用户"
      // description="你确定要删除他吗？"
                   onConfirm={async (e) => {
                     console.log(e);
                     console.log(record.id);
                     const id = record.id;

                     const isDelete = await deleteUser({id: id});

                     if (isDelete) {
                       message.success('删除成功');
                       // 刷新用户信息表单
                       location.reload();
                     } else {
                       message.error('删除失败');
                     }
                   }}
                   onCancel={(e) => {}}
                   okText="Yes"
                   cancelText="No">
      <Button type="primary">删除</Button>
    </Popconfirm>

    /*<Popconfirm >
      <button>修改</button>
    </Popconfirm>*/

    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();

  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // 获取后端的数据，返回到表格
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        const userList = await searchUsers();
        return { data: userList };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          // @ts-ignore
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户"
    />
  );
};
