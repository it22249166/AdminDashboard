import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Select, Table, Tag, notification } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import StatusCard from '../components/StatusCard';

const { Option } = Select;

export default function ProductPage() {
    const [form] = Form.useForm();
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchText, setSearchText] = useState("");

    const handleSubmit = (values) => {
        if (editingProduct) {
            setProducts(products.map(p => p.key === editingProduct.key ? { ...editingProduct, ...values } : p));
            notification.success({ message: 'Product updated' });
        } else {
            const newProduct = {
                key: Date.now(),
                name: values.name,
                category: values.category,
                price: values.price,
                stock: values.stock,
            };
            setProducts([...products, newProduct]);
            notification.success({ message: 'Product added' });
        }
        form.resetFields();
        setEditingProduct(null);
    };

    const handleEdit = (record) => {
        setEditingProduct(record);
        form.setFieldsValue(record);
    };

    const handleDelete = (key) => {
        setProducts(products.filter(p => p.key !== key));
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name', filteredValue: [searchText], onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()) },
        { title: 'Category', dataIndex: 'category', key: 'category', render: (cat) => <Tag color="blue">{cat}</Tag> },
        { title: 'Price ($)', dataIndex: 'price', key: 'price' },
        { title: 'Stock', dataIndex: 'stock', key: 'stock', render: stock => <Tag color={stock > 0 ? "green" : "red"}>{stock > 0 ? `${stock} in stock` : 'Out of stock'}</Tag> },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button icon={<EditOutlined />} className="mr-2" onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.key)} />
                </>
            ),
        }
    ];

    return (
        <>
            {/* Status Cards */}
            <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                        <StatusCard
                            color="green"
                            icon="inventory"
                            title="Total Products"
                            amount={products.length}
                            percentage=""
                            date=""
                        />
                        <StatusCard
                            color="orange"
                            icon="category"
                            title="Categories"
                            amount={[...new Set(products.map(p => p.category))].length}
                            percentage=""
                            date=""
                        />
                        <StatusCard
                            color="red"
                            icon="warning"
                            title="Out of Stock"
                            amount={products.filter(p => p.stock === 0).length}
                            percentage=""
                            date=""
                        />
                        <StatusCard
                            color="blue"
                            icon="price_change"
                            title="Total Value"
                            amount={`$${products.reduce((a, b) => a + (b.price * b.stock), 0).toFixed(2)}`}
                            percentage=""
                            date=""
                        />
                    </div>
                </div>
            </div>

            {/* Product Form + Table */}
            <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    {/* Form */}
                    <div className="bg-white p-6 mb-10 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                        <Form layout="vertical" form={form} onFinish={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Enter name' }]}>
                                    <Input placeholder="Product name" />
                                </Form.Item>
                                <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Select category' }]}>
                                    <Select placeholder="Select category">
                                        <Option value="Electronics">Electronics</Option>
                                        <Option value="Laptop">Laptop</Option>
                                        <Option value="Apparel">Mobile</Option>
                                        <Option value="Accessories">Accessories</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="price" label="Price ($)" rules={[{ required: true, message: 'Enter price' }]}>
                                    <InputNumber min={0} style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item name="stock" label="Stock" rules={[{ required: true, message: 'Enter stock' }]}>
                                    <InputNumber min={0} style={{ width: '100%' }} />
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <Button type="primary" icon={<PlusOutlined />} htmlType="submit">
                                    {editingProduct ? 'Update Product' : 'Add Product'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    {/* Table */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Product List</h2>
                            <Input.Search
                                placeholder="Search product..."
                                allowClear
                                onChange={e => setSearchText(e.target.value)}
                                style={{ width: 250 }}
                            />
                        </div>
                        <Table columns={columns} dataSource={products} pagination={{ pageSize: 5 }} />
                    </div>
                </div>
            </div>
        </>
    );
}