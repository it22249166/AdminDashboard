import React, { useState } from 'react';
import { Form, Input, Button, Select, Table, notification } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import StatusCard from '../components/StatusCard';

const { Option } = Select;

export default function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        const newOrder = {
            key: orders.length + 1,
            customer: values.customer,
            product: values.product,
            quantity: values.quantity,
            status: values.status,
        };
        setOrders([...orders, newOrder]);
        notification.success({
            message: 'Order Created',
            description: 'The order was successfully added!',
        });
        form.resetFields();
    };

    const handleDelete = (key) => {
        setOrders(orders.filter(order => order.key !== key));
    };

    const columns = [
        { title: 'Customer', dataIndex: 'customer', key: 'customer' },
        { title: 'Product', dataIndex: 'product', key: 'product' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => handleDelete(record.key)}
                />
            ),
        },
    ];

    return (
        <>
            {/* Top Metrics */}
            <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                        <StatusCard
                            color="blue"
                            icon="assignment"
                            title="Total Orders"
                            amount={orders.length}
                            percentage="100%"
                            percentageIcon="check"
                            percentageColor="green"
                            date="All time"
                        />
                        <StatusCard
                            color="green"
                            icon="pending_actions"
                            title="Pending"
                            amount={orders.filter(o => o.status === 'Pending').length}
                            percentage=""
                            percentageIcon=""
                            percentageColor=""
                            date=""
                        />
                        <StatusCard
                            color="orange"
                            icon="local_shipping"
                            title="Shipped"
                            amount={orders.filter(o => o.status === 'Shipped').length}
                            percentage=""
                            percentageIcon=""
                            percentageColor=""
                            date=""
                        />
                        <StatusCard
                            color="purple"
                            icon="check_circle"
                            title="Delivered"
                            amount={orders.filter(o => o.status === 'Delivered').length}
                            percentage=""
                            percentageIcon=""
                            percentageColor=""
                            date=""
                        />
                    </div>
                </div>
            </div>

            {/* Order Form and Table */}
            <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-10">
                        <h2 className="text-xl font-bold mb-4">Create New Order</h2>
                        <Form layout="vertical" form={form} onFinish={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Form.Item
                                    name="customer"
                                    label="Customer Name"
                                    rules={[{ required: true, message: 'Please enter customer name' }]}
                                >
                                    <Input placeholder="John Doe" />
                                </Form.Item>

                                <Form.Item
                                    name="product"
                                    label="Product"
                                    rules={[{ required: true, message: 'Please select a product' }]}
                                >
                                    <Select placeholder="Select product">
                                        <Option value="Laptop">Laptop</Option>
                                        <Option value="Phone">Phone</Option>
                                        <Option value="Tablet">Tablet</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="quantity"
                                    label="Quantity"
                                    rules={[{ required: true, message: 'Enter quantity' }]}
                                >
                                    <Input type="number" min={1} placeholder="1" />
                                </Form.Item>

                                <Form.Item
                                    name="status"
                                    label="Order Status"
                                    rules={[{ required: true, message: 'Select status' }]}
                                >
                                    <Select>
                                        <Option value="Pending">Pending</Option>
                                        <Option value="Shipped">Shipped</Option>
                                        <Option value="Delivered">Delivered</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                                    Create Order
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Order List</h2>
                        <Table columns={columns} dataSource={orders} pagination={{ pageSize: 5 }} />
                    </div>
                </div>
            </div>
        </>
    );
}