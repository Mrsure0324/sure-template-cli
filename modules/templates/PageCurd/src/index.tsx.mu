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
import userListApi from '@/services/{{name}}/{{name}}Api';

// Tool
import dayjs from 'dayjs';

const {{name}} = () => {
	{{#isSearch}}
	const [searchForm] = Form.useForm();
	const [searchParams, setSearchParams] = useState<any>(null);
	{{/isSearch}}
	
	{{#isTable}}
	const tableRequest = usePagination(
		({ current, pageSize }) => {
			return userListApi.getUserList({
				pageNo: current,
				pageSize,
				{{#isSearch}}
				...searchParams,
				{{/isSearch}}
			});
		},
		{
			defaultPageSize: 20,
			{{#isSearch}}
			refreshDeps: [searchParams],
			{{/isSearch}}
			
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
	{{/isTable}}

	

	

	const actionsSlot = [
		<CustomButton key="export" onClick={exportHandler}>
			导出
		</CustomButton>,
	];
	
	{{#isSearch}}
	const searchRenderConfig: SearchItem[] = [
		{
			type: SearchTypes.Input,
			name: 'userId',
			label: '用户ID',
		},
		{
			type: SearchTypes.Input,
			name: 'userName',
			label: '用户名称',
		},
        {
			type: SearchTypes.DatePickerRange,
			name: 'time',
			label: '时间',
		},
	];

	const searchValuesFormat = () => {
		const values = searchForm.getFieldsValue();
		const params = {
			...values,
			timeStart:
				values?.regTime &&
				values?.regTime[0] &&
				dayjs(values?.regTime[0]).format('YYYY-MM-DD'),
			timeEnd:
				values?.regTime &&
				values?.regTime[1] &&
				dayjs(values?.regTime[1]).format('YYYY-MM-DD'),
		};

		delete params?.time;

		return params;
	};

	const search = () => {
		const params = searchValuesFormat();
		setSearchParams(params);
	};
	{{/isSearch}}
	

	return (
		<>
			<PageContainer title={'{{nameZh}}'}>
				{{#isSearch}}
				<Search
					form={searchForm}
					renderConfig={searchRenderConfig}
					onFinish={search}
					isNeedAdvancedSearch={true}
					advancedSearchResidueNum={3}
				></Search>
				{{/isSearch}}
				{{#isTable}}
				<CustomTable
					columns={columns}
					actionsSlot={actionsSlot}
					dataSource={tableRequest?.data?.content || []}
					pagination={{
						...tableRequest?.pagination,
						showQuickJumper: true,
						showSizeChanger: true,
					}}
					rowKey="userId"
					loading={tableRequest?.loading}
					scroll={{ x: 1200 }}
				/>
				{{/isTable}}
			</PageContainer>
		</>
	);
};

export default {{name}};
