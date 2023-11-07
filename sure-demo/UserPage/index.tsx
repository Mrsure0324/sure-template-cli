//Hooks
import { usePagination, useRequest } from 'ahooks';
import { useState } from 'react';
// UI
import CustomButton from '@/components/CustomButton';
import CustomTable from '@/components/CustomTable';;
import PageContainer from '@/components/PageContainer';
import Search from '@/components/Search';
import {  Form, message } from 'antd';
// Types
import { SearchItem, SearchTypes } from '@/components/Search/types';
import type { ColumnsType } from 'antd/es/table';
// Api
import userListApi from '@/services/UserPage/UserPageApi';

// Tool
import dayjs from 'dayjs';

const UserPage = () => {
	
	const tableRequest = usePagination(
		({ current, pageSize }) => {
			return userListApi.getUserList({
				pageNo: current,
				pageSize,
			});
		},
		{
			defaultPageSize: 20,
			
		},
	);

	const downloadRequest = useRequest(
		(params) => userListApi.download(params || {}),
		{
			manual: true,
			onError: (error) => {
				console.error(error);
				message.error('下载出错');
			},
		},
	);

	const columns: ColumnsType<any> = [
		{
			title: '用户ID',
			dataIndex: 'userId',
			key: 'userId',
		},
        {
			title: '用户名称',
			dataIndex: 'userName',
			key: 'userName',
		},
	];

	const exportHandler = () => {
		downloadRequest.run(searchParams);
	};

	

	

	const actionsSlot = [
		<CustomButton key="export" onClick={exportHandler}>
			导出
		</CustomButton>,
	];
	
	

	return (
		<>
			<PageContainer title={'用户页面'}>
				<CustomTable
					columns={columns}
					actionsSlot={actionsSlot}
					dataSource={tableRequest?.data?.content || []}
					pagination=
					rowKey="userId"
					loading={tableRequest?.loading}
					scroll=
				/>
			</PageContainer>
		</>
	);
};

export default UserPage;
