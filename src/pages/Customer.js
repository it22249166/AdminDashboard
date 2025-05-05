import React, { useState } from 'react';
import { Form, Input, Button, Table, Modal, notification, Tag } from 'antd';
import { UserAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import StatusCard from '../components/StatusCard';

export default function CustomerPage() {
    const [form] = Form.useForm();
    const [customers, setCustomers] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleSubmit = (values) => {
        if (editingCustomer) {
            setCustomers(customers.map(c => c.key === editingCustomer.key ? { ...editingCustomer, ...values } : c));
            notification.success({ message: 'Customer updated successfully' });
        } else {
            const newCustomer = {
                key: Date.now(),
                ...values,
            };
            setCustomers([...customers, newCustomer]);
            notification.success({ message: 'Customer added successfully' });
        }
        form.resetFields();
        setEditingCustomer(null);
    };

    const handleEdit = (record) => {
        setEditingCustomer(record);
        form.setFieldsValue(record);
    };

    const handleDelete = (key) => {
        setCustomers(customers.filter(c => c.key !== key));
        notification.info({ message: 'Customer deleted' });
    };

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'name',
            key: 'name',
            filteredValue: [searchText],
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
        },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Active' ? 'green' : 'volcano'}>{status}</Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button icon={<EditOutlined />} className="mr-2" onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.key)} />
                </>
            ),
        },
    ];

    return (
        <>
            {/* Status Cards */}
            <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                        <StatusCard
                            color="blue"
                            icon="groups"
                            title="Total Customers"
                            amount={customers.length}
                        />
                        <StatusCard
                            color="green"
                            icon="verified_user"
                            title="Active Customers"
                            amount={customers.filter(c => c.status === 'Active').length}
                        />
                        <StatusCard
                            color="red"
                            icon="person_off"
                            title="Inactive Customers"
                            amount={customers.filter(c => c.status === 'Inactive').length}
                        />
                        <StatusCard
                            color="purple"
                            icon="person_add"
                            title="New This Month"
                            amount="5"
                            percentage="12"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Growth"
                        />
                    </div>
                </div>
            </div>

            {/* Form + Table */}
            <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    {/* Form */}
                    <div className="bg-white p-6 mb-10 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">{editingCustomer ? 'Edit Customer' : 'Add Customer'}</h2>
                        <Form layout="vertical" form={form} onFinish={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                                    <Input placeholder="Customer name" />
                                </Form.Item>
                                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                                    <Input placeholder="example@email.com" />
                                </Form.Item>
                                <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                                    <Input placeholder="+94 71 234 5678" />
                                </Form.Item>
                                <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                                    <Input placeholder="Active / Inactive" />
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <Button type="primary" icon={<UserAddOutlined />} htmlType="submit">
                                    {editingCustomer ? 'Update Customer' : 'Add Customer'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    {/* Table */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Customer List</h2>
                            <Input.Search
                                placeholder="Search customers"
                                allowClear
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{ width: 250 }}
                            />
                        </div>
                        <Table columns={columns} dataSource={customers} pagination={{ pageSize: 5 }} />
                    </div>
                </div>
            </div>
        </>
    );
}