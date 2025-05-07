import React from 'react';
import { Form, Input, Button, DatePicker, Select, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'; // Required for DatePicker defaultValue
import StatusCard from '../components/StatusCard';

const { Option } = Select;

export default function ProfilePage() {
    const userInfo = {
        name: 'Malith Bandara',
        email: 'malithb072@gmail.com',
        gender: 'Male',
        birthdate: '2002-07-02',
        role: 'Software Engineer',
        location: 'Ratnapura, Sri Lanka',
    };

    const columns = [
        {
            title: 'Field',
            dataIndex: 'field',
            key: 'field',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
    ];

    const data = Object.entries(userInfo).map(([key, value], index) => ({
        key: index,
        field: key.charAt(0).toUpperCase() + key.slice(1),
        value,
    }));

    return (
        <>
            {/* Top Metrics */}
            <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <StatusCard
                            color="blue"
                            icon="person"
                            title="User Role"
                            amount={userInfo.role}
                            date="As of now"
                        />
                        <StatusCard
                            color="green"
                            icon="email"
                            title="Email"
                            amount={userInfo.email}
                            date="Verified"
                        />
                        <StatusCard
                            color="purple"
                            icon="location_on"
                            title="Location"
                            amount={userInfo.location}
                            date="Updated"
                        />
                    </div>
                </div>
            </div>

            {/* Profile Info Form and Table */}
            <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-10">
                        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                        <Form layout="vertical">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Form.Item label="Full Name" name="name">
                                    <Input defaultValue={userInfo.name} />
                                </Form.Item>
                                <Form.Item label="Email" name="email">
                                    <Input defaultValue={userInfo.email} />
                                </Form.Item>
                                <Form.Item label="Gender" name="gender">
                                    <Select defaultValue={userInfo.gender}>
                                        <Option value="Male">Male</Option>
                                        <Option value="Female">Female</Option>
                                        <Option value="Other">Other</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Birthdate" name="birthdate">
                                    <DatePicker
                                        className="w-full"
                                        defaultValue={dayjs(userInfo.birthdate)}
                                        format="YYYY-MM-DD"
                                    />
                                </Form.Item>
                                <Form.Item label="Location" name="location">
                                    <Input defaultValue={userInfo.location} />
                                </Form.Item>
                                <Form.Item label="Role" name="role">
                                    <Input defaultValue={userInfo.role} />
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <Button type="primary" icon={<EditOutlined />}>
                                    Update Profile
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">User Information</h2>
                        <Table columns={columns} dataSource={data} pagination={false} />
                    </div>
                </div>
            </div>
        </>
    );
}