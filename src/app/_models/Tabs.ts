export interface Tabs {
  titlename?: string;
  id?: string;
  tab: AllMenuTabs;
  active?: boolean,
  pMenu: string;
}

export enum AllMenuTabs {
  dashboard = 'dashboard',
  ai_dashboard = 'ai_dashboard',
  ai_product_dashboard = 'ai_product_dashboard',
  ai_subscription_dashboard = 'ai_subscription_dashboard',
  ai_channelorderdownloader_dashboard = 'ai_channelorderdownloader_dashboard',
  ai_subscriptionplans_dashboard = 'ai_subscriptionplans_dashboard',
  ai_user_dashboard = 'ai_user_dashboard',
  cancelled_Orders = 'cancelled_Orders',
  mange_Orders = 'mange_Orders',
  mcf_Orders = 'mcf_Orders',
  order_summary = 'order_summary',
  return_orders = 'return_orders',
  sales_orders = 'sales_orders',
  dispatch_console = 'dispatch_console',
  click_collect = 'click_collect',
  ready_to_shipment = 'ready_to_shipment',
  error_labels = 'error_labels',
  shipped_Orders = 'shipped_Orders',
  sales_by_prod = 'sales_by_prod',
  low_stock = 'low_stock',
  stock_value_repo = 'stock_value_repo',
  order_history = 'order_history',
  products = 'products',
  channel_products = 'channel_products',
  stock_view = 'stock_view',
  purchanse_orders = 'purchanse_orders',
  wareHouses = 'warehouses',
  stocksummary = 'stockSummary',
  transfers = 'transfers',
  suppliers = 'suppliers',
  customers = 'customers',
  channel_integration = 'channel_integration',
  shipping_integration = 'shipping_integration',
  shipping_manifests = 'shipping_manifests',
  filed_manifests = 'filed_manifests',
  shipping_courier_setup = 'shipping_courier_setup',
  waiting_to_list = 'waiting_to_list',
  list_errors = 'lis_errors',
  listed_products = 'listed_products',
  closed_products = 'closed_products',
  channel_sceduled_listing = 'channel_scheduled_listing',
  manage_fba = 'manage_fba',
  create_products_to_fba = 'create_products_to_fba',
  send_products_to_fba = 'send_products_to_fba',
  products_in_fba = 'products_in_fba',
  my_account = 'my_account',
  announcements = 'announcements',
  releases = 'releases',
  user_management = 'user_management',
  suscrption = 'suscrption',
  reedem_coupon = 'reedem_coupon',
  user_guide = 'user_guide',
  created_order = 'created_order',
  create_product = 'create_product',
  edit_product = 'edit_product',
  view_order = 'view_order',
  edit_order = 'edit_order',
  user_settings = 'user_setting',
  ebay_inte = 'ebay_inte',
  channel_inte = 'channel_inte',
  ecom_inte = 'ecom_inte',
  accounting_inte = 'accounting_inte',
  accounting_info = 'accounting_info',
  template_desines = 'template_desines',
  automations = 'automations',
  amazon_stock_repricer = 'amazon_stock_repricer',
  repricing_items = 'repricing_items',
  repricing_settings = 'repricing_settings',
  create_po = 'create_po',
  edit_po = 'edit_po',
  create_bundle_product = 'create_bundle_product',
  duplicateOrder = 'duplicateOrder',
  customer_replies = 'customer_replies',
  category = 'category',
  fba_calculator = 'fba_calculator'
  // product_attributes='product_attributes',
  // bulk_actions='bulk_actions',
  // barcode_management='barcode_management',
  // inventory_Sync='inventory_Sync',
  // shipping_rules='shipping_rules',
}

export enum OrderTabs {
  cancelled_Orders = 'cancelled_Orders',
  mange_Orders = 'mange_Orders',
  mcf_Orders = 'mcf_Orders',
  order_summary = 'order_summary',
  return_orders = 'return_orders',
  sales_orders = 'sales_orders',
  dispatch_console = 'dispatch_console',
  click_collect = 'click_collect',
  ready_to_shipment = 'ready_to_shipment',
  error_labels = 'error_labels',
  shipped_Orders = 'shipped_Orders',
}

export enum ReportTabs {
  sales_by_prod = 'sales_by_prod',
  low_stock = 'low_stock',
  stock_value_repo = 'stock_value_repo',
  order_history = 'order_history'
}

export enum InventoryTabs {
  products = 'products',
  channel_products = 'channel_products',
  stock_view = 'stock_view',
  purchanse_orders = 'purchanse_orders'
}