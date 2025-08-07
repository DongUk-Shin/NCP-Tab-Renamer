// rules.js 파일
const renameRules = [

    /*
    명명 규칙

    Server, VPC 는 하위 카테고리로 네이밍
    Ex) https://console.ncloud.com/vpc-network/subnet -> Subnet Management

    이외의 서비스는 상위 카테고리로 네이밍
    Ex) https://console.ncloud.com/vpc-load-balancer/targetGroup -> Load Balancer 

    */

    // Server
    { url: "/dashboard", name: "Dashboard" },
    { url: "/vpc-compute/serverImage", name: "Server Image" },
    { url: "/vpc-compute/server", name: "Server" },
    { url: "/vpc-compute/bareMetalServer", name: "Bare Metal Server" },
    { url: "/vpc-compute/storage", name: "Storage" },
    { url: "/vpc-compute/snapshot", name: "Snapshot" },
    { url: "/vpc-compute/publicIp", name: "Public IP" },
    { url: "/vpc-compute/initScript", name: "Init Script" },
    { url: "/vpc-compute/nic", name: "Network Interface" },
    { url: "/vpc-compute/acg", name: "ACG" },
    { url: "/vpc-compute/fabricCluster", name: "Fabric Cluster" },
    { url: "/vpc-compute/event", name: "Event" },

    // VPC
    { url: "/vpc-network/vpc", name: "VPC Management" },
    { url: "/vpc-network/subnet", name: "Subnet Management" },
    { url: "/vpc-network/acl", name: "Network ACL" },
    { url: "/vpc-network/denyAllowList", name: "Network ACL" },
    { url: "/vpc-network/nat-gateway", name: "NAT Gateway" },
    { url: "/vpc-network/vpcPeering", name: "VPC Peering" },
    { url: "/vpc-network/endpoint-interface", name: "Private Link" },
    { url: "/vpc-network/routeTable", name: "Route Table" },
    { url: "/vpc-network/endpoint-route-table", name: "Route Table" },
    { url: "/vpc-network/service-function-chain", name: "Service Function Chain" },
    { url: "/vpc-network/vgw", name: "Virtual Private Gateway (Old)" },
    { url: "/vpc-network/vpg", name: "Virtual Private Gateway" },
    { url: "/vpc-network/groupVpg", name: "Virtual Private Gateway Group" },
    { url: "/vpc-network/transit-vpc-connect", name: "Transit VPC Connect" },
    { url: "/vpc-network/publicIp", name: "Public IP" },

    // Compute
    { url: "/vpc-auto-scaling", name: "Auto Scaling" },
    { url: "/vpcCloudFunctions", name: "Cloud Functions" },

    // Containers
    { url: "/ncr/registries", name: "Container Registry" },
    { url: "/vnks", name: "Ncloud Kubernetes Service" },

    // Storage
    { url: "/ncloud-storage/management", name: "Ncloud Storage" },
    { url: "/objectStorage", name: "Object Storage" },
    { url: "/vpc-nas", name: "NAS" },
    { url: "/archiveStorage", name: "Archive Storage" },
    { url: "/vpc-cloud-backup", name: "Backup" },

    // Networking
    { url: "/vpc-load-balancer", name: "Load Balancer" },
    { url: "/dns", name: "Global DNS" },
    { url: "/vpc-packet-mirroring", name: "Packet Mirroring" },
    { url: "/vpc-ipsec-vpn", name: "IPsec VPN" },
    { url: "/global-traffic-manager", name: "Global Traffic Manager" },
    { url: "/classic-path", name: "Classic Path" },
    { url: "/vpc-cloud-connect/ncloudConnect", name: "Cloud Connect" },

    // Database
    { url: "/vpcCloudMysql", name: "Cloud DB for MySQL" },
    { url: "/vpcCloudCache", name: "Cloud DB for Cache" },
    { url: "/vpcCloudMSSQL", name: "Cloud DB for MSSQL" },
    { url: "/vpcCloudMongoDB", name: "Cloud DB for MongoDB" },
    { url: "/vpcCloudPostgresql", name: "Cloud DB for PostgreSQL" },
    { url: "/vpcMigService", name: "Database Migration Service" },

    // Security
    { url: "/app-security-safer", name: "App Safer" },
    { url: "/security-file-safer", name: "File Safer" },
    { url: "/web-security-checker/webChecker", name: "Web Security Checker" },
    { url: "/system-security-checker", name: "System Security Checker" },
    { url: "/vpc-ssl-vpn/sslVpn", name: "SSL VPN" },
    { url: "/secu-monitoring", name: "Security Monitoring" },
    { url: "/compliance-guide", name: "Compliance Guide" },
    { url: "/security-kms", name: "Key Management Service" },
    { url: "/certificate-manager", name: "Certificate Manager" },
    { url: "/private-ca/ca", name: "Private CA" },
    { url: "/web-shell", name: "WebShell Behavior Detector" },
    { url: "/cloudSecurityWatcher", name: "Cloud Security Watcher" },
    { url: "/secret-manager", name: "Secret Manager" },

    // AI Services
    { url: "/papago-translation", name: "Papago Translation" },
    { url: "/chatbot", name: "CLOVA Chatbot" },
    { url: "/ocr", name: "CLOVA OCR" },
    { url: "/nest", name: "CLOVA Speech" },
    { url: "/dubbing", name: "CLOVA Dubbing" },
    { url: "/aitems", name: "AiTEMS" },
    { url: "/clova-studio", name: "CLOVA Studio" },
    { url: "/eye/domain", name: "CLOVA GreenEye" }, 
    
    // Application Services
    { url: "/geolocation", name: "GeoLocation" }, 
    { url: "/sens", name: "Simple & Easy Notification Service" }, 
    { url: "/emailSVR", name: "Cloud Outbound Mailer" }, 
    { url: "/apigw", name: "API Gateway" }, 
    { url: "/maps", name: "Maps" }, 
    { url: "/vrmq", name: "Ncloud Simple RabbitMQ" }, 

    // AI·NAVER API
    { url: "/naver-service", name: "AI·NAVER API" },

    // Big Data & Analytics
    { url: "/cloudsearch", name: "Cloud Search0" },
    { url: "/VPCSearchEngine", name: "Search Engine Service" },
    { url: "/vpcCloudHadoop", name: "Cloud Hadoop" },
    { url: "/CloudDataStreamingService", name: "Cloud Data Streaming Service" },
    { url: "/dataforest", name: "Data Forest" },
    { url: "/cloud-data-catalog", name: "Data Catalog" },
    { url: "/dataflow", name: "Data Flow" },
    { url: "/dataquery", name: "Data Query" },
    { url: "/nimoro", name: "NIMORO" },
    { url: "/datastream", name: "Data Stream" },

    // Blockchain
    { url: "/blockchain-service", name: "Blockchain Service" },

    // Business Applications
    { url: "/ncloudchat", name: "Ncloud Chat" },

    // Content Delivery
    { url: "/global-edge", name: "Global Edge" },
    { url: "/cdn-plus", name: "CDN+ (Domestic)" },
    { url: "/global-cdn", name: "Global CDN" },

    // Developer Tools
    { url: "/source-commit", name: "SourceCommit" },
    { url: "/source-build", name: "SourceBuild" },
    { url: "/vpc-source-deploy", name: "SourceDeploy" },
    { url: "/vpc-source-pipeline", name: "SourcePipeline" },
    { url: "/source-band", name: "SourceBand" },

    // Digital Twin
    { url: "/arc-eye", name: "ARC eye" },

    // Gaming
    { url: "/gamepot", name: "GAMEPOT" },
    
    // Hybrid & Private Cloud
    { url: "/vpc-neurocloud", name: "Neurocloud" },

    // Management & Governance
    { url: "/ResourceManager", name: "Resource Manager" },
    { url: "/elsa", name: "Effective Log Search & Analytics" },
    { url: "/wms", name: "Web service Monitoring System" },
    { url: "/cla", name: "Cloud Log Analytics" },
    { url: "/iam", name: "Sub Account" },
    { url: "/service-quota", name: "Service Quota" },
    { url: "/cost-explorer", name: "Cost Explorer" },
    { url: "/cat", name: "Cloud Activity Tracer" },
    { url: "/ci", name: "Cloud Insight" },
    { url: "/organization", name: "Organization" },
    { url: "/vpc-ntm", name: "Network Traffic Monitoring" },
    { url: "/pinpoint", name: "Pinpoint Cloud" },
    { url: "/cloud-advisor", name: "Cloud Advisor" },
    { url: "/api-workflow", name: "API Workflow" },
    { url: "/ncloud-sso", name: "Ncloud Single Sign-On" },
    { url: "/nr", name: "Notification Recipient" },

    // Media
    { url: "/vpe", name: "Video Player Enhancement" },
    { url: "/image-optimizer", name: "Image Optimizer" },
    { url: "/liveStationPlus", name: "Live Station" },
    { url: "/vodStation2", name: "VOD Station" },
    { url: "/cms", name: "Media Connect Center" },
    { url: "/prism-live-studio", name: "B2B PRISM Live Studio" },
    { url: "/multi-drm", name: "One Click Multi DRM" },
    { url: "/maiu", name: "Media AI Understanding" },

    // Migration
    { url: "/ObjectMigration", name: "Object Migration" },
    { url: "/data-teleporter", name: "Data Teleporter" },





    // 금융존
    { url: "/hsm", name: "Hardware Security Module" },

];